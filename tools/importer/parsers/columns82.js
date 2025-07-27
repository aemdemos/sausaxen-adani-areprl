/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main content container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find all rows directly under the container
  const rows = container.querySelectorAll(':scope > .row');

  // Collect all .col-lg-6 columns from all rows (should be 4 in total, for 4 columns)
  let colDivs = [];
  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > .col-lg-6'));
    if (cols.length) colDivs = colDivs.concat(cols);
  });
  if (colDivs.length === 0) return;

  // For each column, reference the existing heading and .p-4 content
  const columns = colDivs.map(col => {
    // Find the heading (h2.heading class)
    const heading = col.querySelector('h2.heading');
    // Find the .p-4 wrapper
    const p4 = col.querySelector('.p-4');
    // Build a wrapper div to contain both (as in source)
    const wrapper = document.createElement('div');
    if (heading) wrapper.appendChild(heading);
    if (p4) wrapper.appendChild(p4);
    return wrapper;
  });

  // Compose the table rows: header, then columns row
  const headerRow = ['Columns (columns82)'];
  const tableRows = [headerRow, columns];

  // Create columns block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}
