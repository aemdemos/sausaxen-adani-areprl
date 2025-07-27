/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container in the section
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the .row containing columns
  const row = container.querySelector('.row');
  if (!row) return;
  // Find immediate column children
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  // Left column: should contain .col-md-12.bg-white.p-5
  let leftContent = columns[0].querySelector('.col-md-12.bg-white.p-5');
  if (!leftContent) leftContent = columns[0]; // fallback
  // Right column: should contain .p-4.bg-white.NewsAdts
  let rightContent = columns[1].querySelector('.p-4.bg-white.NewsAdts');
  if (!rightContent) rightContent = columns[1]; // fallback
  // Build the block table
  const cells = [
    ['Columns (columns81)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
