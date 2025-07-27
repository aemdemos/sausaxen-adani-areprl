/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, include all its direct content (including text!)
  const columns = columnDivs.map((col) => {
    // If there are no children, but there is text, preserve the text
    if (!col.children.length && col.textContent && col.textContent.trim()) {
      return col.textContent;
    }

    // If column has only one child and no other text nodes, return that child
    if (col.childNodes.length === 1 && col.firstElementChild) {
      return col.firstElementChild;
    }

    // Otherwise, collect all direct children and text nodes
    const nodes = [];
    col.childNodes.forEach((node) => {
      // Only include nodes that aren't empty text
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          nodes.push(document.createTextNode(node.textContent));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node);
      }
    });
    return nodes.length === 1 ? nodes[0] : nodes;
  });

  // Compose the block table: header & columns row
  const cells = [
    ['Columns (columns33)'],
    columns
  ];
  // Create the table using WebImporter helper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set header colspan if more than 1 column
  const th = table.querySelector('tr:first-child > th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  // Replace original element with new block table
  element.replaceWith(table);
}
