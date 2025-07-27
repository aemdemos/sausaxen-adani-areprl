/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns25)'];

  // Find the columns within the .row
  const row = element.querySelector('.container > .row');
  if (!row) return;

  // Each immediate .col-lg-4 child is a column
  const cols = Array.from(row.children);
  // Prepare the array that will hold table cells for the second row
  const bodyRow = [];

  cols.forEach((col, idx) => {
    // For each column, find the main content block
    const box = col.querySelector('.box-block');
    // For the third column, also look for the Media Library link (after the box)
    if (idx === 2) {
      // Look for <p> with class mt-5 or my-3
      const libLink = col.querySelector('p.mt-5, p.my-3');
      if (box && libLink) {
        bodyRow.push([box, libLink]);
      } else if (box) {
        bodyRow.push(box);
      } else if (libLink) {
        bodyRow.push(libLink);
      } else {
        bodyRow.push(col);
      }
    } else if (box) {
      bodyRow.push(box);
    } else {
      bodyRow.push(col);
    }
  });

  // Create the columns table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  element.replaceWith(table);
}
