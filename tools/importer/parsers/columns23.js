/* global WebImporter */
export default function parse(element, { document }) {
  // Find all top-level column divs
  const columnDivs = Array.from(element.children).filter(
    (child) => child.tagName === 'DIV' && /col(-|_)/i.test(child.className)
  );

  // Header row: exactly one cell as in the example
  const headerRow = ['Columns (columns23)'];

  // Content row: one cell per column
  const columnsRow = columnDivs.map((col) => {
    // If column is just a p > img, use the image directly
    if (
      col.children.length === 1 &&
      col.children[0].tagName === 'P' &&
      col.children[0].children.length === 1 &&
      col.children[0].children[0].tagName === 'IMG'
    ) {
      return col.children[0].children[0];
    }
    // Otherwise, collect all meaningful content nodes
    const content = Array.from(col.childNodes).filter((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
        // keep p if not empty or contains <img> or <a>
        return (
          node.textContent.trim().length > 0 ||
          node.querySelector('img, a')
        );
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      } else if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return false;
    });
    return content.length === 1 ? content[0] : content;
  });

  // Compose the table: first row is header, second is columns
  const cells = [headerRow, columnsRow];

  // Replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
