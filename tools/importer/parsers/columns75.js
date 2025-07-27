/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: handle empty element
  if (!element) return;

  // Find the carousel stage with the .row of columns
  const stageOuter = element.querySelector('.bootstrape-stage-outer');
  if (!stageOuter) return;
  const stage = stageOuter.querySelector('.bootstrape-stage');
  if (!stage) return;

  // The .row contains all column divs (each column)
  const row = stage.querySelector('.row');
  if (!row) return;

  // Find all immediate col divs
  const columns = Array.from(row.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // The block is a Columns (columns75), so header should be exactly:
  const headerRow = ['Columns (columns75)'];

  // This type of block has N columns per row (here, always 3)
  // Build rows of 3 columns each (as in the markdown example)
  const COLUMN_COUNT = 3;
  const blockRows = [];
  for (let i = 0; i < columns.length; i += COLUMN_COUNT) {
    // Each cell is the <ul> from the column
    const rowCells = columns.slice(i, i + COLUMN_COUNT).map(col => {
      // Return the <ul> inside this column (should always exist)
      const ul = col.querySelector('ul.ul-reports');
      return ul ? ul : col;
    });
    // Fill up the row if there are less than 3 columns in this row (last row edge-case)
    while (rowCells.length < COLUMN_COUNT) {
      rowCells.push('');
    }
    blockRows.push(rowCells);
  }

  // Compose the table rows
  const cells = [headerRow, ...blockRows];

  // Create the block table using referenced elements
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
