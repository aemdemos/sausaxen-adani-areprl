/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container with columns
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Get all top-level columns in the row
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: keep all children (heading and paragraphs)
  const leftCol = columns[0];
  // Reference all child elements (preserve order)
  const leftContent = Array.from(leftCol.children);
  // If empty, fallback to an empty div
  const leftCell = leftContent.length > 0 ? leftContent : [document.createElement('div')];

  // Right column: carousel might be nested
  const rightCol = columns[1];
  // Try to find an <img> inside the right column
  const img = rightCol.querySelector('img');
  const rightCell = img ? [img] : [document.createElement('div')];

  // Table: header and one row with two columns
  const cells = [
    ['Columns (columns22)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
