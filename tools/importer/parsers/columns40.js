/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active .tab-pane (the visible section)
  const activePane = element.querySelector('.tab-pane.active');
  if (!activePane) return;

  // Try to find columns: look for .row > .col-*
  let columns = [];
  const row = activePane.querySelector('.row');
  if (row) {
    const cols = Array.from(row.querySelectorAll(':scope > div[class*="col-"]'));
    // If we found column divs, use them
    if (cols.length) {
      columns = cols;
    } else {
      // Otherwise, treat the whole row as a single column
      columns = [row];
    }
  } else {
    // If no row, treat the whole pane as a single column
    columns = [activePane];
  }

  // For each column, gather all child nodes (to preserve text and structure)
  const contentRow = columns.map((col) => {
    // If the column is empty, return an empty string
    if (!col.childNodes || !col.childNodes.length) return '';
    // Move all nodes (to preserve elements and text)
    const frag = document.createElement('div');
    while (col.childNodes.length > 0) {
      frag.appendChild(col.childNodes[0]);
    }
    return frag;
  });

  // Construct the block table
  // Header row: must always be a single cell, even if there are multiple columns
  const headerRow = ['Columns (columns40)'];
  const cells = [headerRow];
  cells.push(contentRow);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
