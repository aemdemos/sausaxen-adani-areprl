/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child columns (e.g., <div class="col-lg-6">
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column gets a cell (as in the example)
  const contentRow = columns.map((col) => {
    // If only one child, just use that (likely an <img>)
    if (col.children.length === 1 && !col.textContent.trim()) {
      return col.firstElementChild;
    }
    // Otherwise, gather all children (for robustness)
    const contents = [];
    col.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        contents.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent;
        contents.push(span);
      }
    });
    return contents.length === 1 ? contents[0] : contents;
  });

  // Table: header row (single cell), then row with one cell per column
  const cells = [
    ['Columns (columns16)'],
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
