/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find direct child by selector
  function immediateChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Grab the .container > .row
  const container = element.querySelector('.container');
  if (!container) return;
  const mainRow = immediateChild(container, '.row');
  if (!mainRow) return;

  // 2. Find the two main columns: left (.col-lg-8) and right (.col-lg-4)
  const leftCol = immediateChild(mainRow, '.col-lg-8');
  const rightCol = immediateChild(mainRow, '.col-lg-4');
  if (!leftCol || !rightCol) return;

  // Build the table with a single header cell (row 1), and one row with two columns (row 2)
  const cells = [
    ['Columns (columns39)'], // Header row: exactly one column
    [leftCol, rightCol]      // Second row: two columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the constructed table
  element.replaceWith(table);
}
