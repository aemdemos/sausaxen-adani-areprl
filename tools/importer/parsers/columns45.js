/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row container
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all direct .col-* children
  const columns = Array.from(row.children).filter(
    (div) => div.classList && Array.from(div.classList).some((c) => c.startsWith('col-'))
  );

  // The header row must be a single cell, not one per column
  const headerRow = ['Columns (columns45)'];

  // Top row (first two columns)
  const topRow = [columns.slice(0, 2).map(col => col)];
  // Second row (next three columns)
  const bottomRow = [columns.slice(2, 5).map(col => col)];

  // Each row should be a single array, so we need to spread the arrays into their own rows
  // The cells array should look like [[header],[col1, col2],[col3, col4, col5]]
  const tableCells = [headerRow, columns.slice(0, 2), columns.slice(2, 5)];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
