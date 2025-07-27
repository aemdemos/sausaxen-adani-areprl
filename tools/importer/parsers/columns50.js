/* global WebImporter */
export default function parse(element, { document }) {
  // Build header as a single cell, matching the example
  const headerRow = ['Columns (columns50)'];

  // Find all immediate column elements
  const cols = Array.from(
    element.querySelectorAll(':scope > .container > .row > div.col-lg-4')
  );

  // Each cell in the content row should be an array containing the .bg-white block (for resilience)
  // This ensures each .bg-white content is wrapped in its own cell, as in the markdown example
  const contentRow = cols.map(col => {
    const content = col.querySelector(':scope > .bg-white');
    // Reference the element directly for semantic fidelity
    return [content];
  });

  // But createTable expects row to be [cell1, cell2, cell3,...], not [[cell1],[cell2],[cell3]]
  // So flatten each cell to the element directly (not wrapped in array)
  const flatContentRow = contentRow.map(cellArr => cellArr[0]);

  // Build the block table: header (1 cell), content (as many as there are columns)
  const tableArr = [headerRow, flatContentRow];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}
