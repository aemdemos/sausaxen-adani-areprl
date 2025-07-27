/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel block (the block with all the columns)
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;

  // Find the single .item > .row containing all columns
  const item = carousel.querySelector('.item');
  if (!item) return;
  const row = item.querySelector('.row');
  if (!row) return;

  // Find all direct .col-md-4 children of the row (each is a column cell)
  const columns = Array.from(row.children).filter(col => col.classList.contains('col-md-4'));
  if (columns.length === 0) return;

  // Each .col-md-4 contains a single ul.ul-reports
  const cellsContent = columns.map(col => {
    const ul = col.querySelector('ul.ul-reports');
    return ul ? ul : col;
  });

  // Create the header row (single cell only)
  const headerRow = ['Columns (columns7)'];

  // Arrange the content into rows of 3 columns each
  const contentRows = [];
  for (let i = 0; i < cellsContent.length; i += 3) {
    const rowCells = cellsContent.slice(i, i + 3);
    // If the last row has fewer than 3 columns, pad with empty strings
    while (rowCells.length < 3) {
      rowCells.push('');
    }
    contentRows.push(rowCells);
  }

  // Compose all rows for the table
  const tableRows = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}