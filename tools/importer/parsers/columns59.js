/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner content block (with gradient background)
  const innerBox = element.querySelector('.boxzoom, .bg-gradient');
  if (!innerBox) return;

  // Build left column: heading + paragraphs
  const leftCellContent = [];
  const heading = innerBox.querySelector('h3, .section-heading');
  if (heading) leftCellContent.push(heading);
  innerBox.querySelectorAll('p').forEach(p => leftCellContent.push(p));

  // Build right column: phone/fax row if present (as in the source it is visually a second column)
  let rightCellContent = [];
  const contactRow = innerBox.querySelector('.row');
  if (contactRow) {
    // Get all immediate columns, ignore if empty
    const contactCols = Array.from(contactRow.querySelectorAll(':scope > div'));
    if (contactCols.length > 0) {
      // For each contact col, if not empty, add to right cell (as separate lines)
      rightCellContent = contactCols.filter((col) => col && col.textContent.trim()).map(col => col);
    }
  }
  // If rightCellContent is still empty, use an empty string (to guarantee two columns)
  if (rightCellContent.length === 0) rightCellContent = '';

  // The header row must have exactly one cell
  const headerRow = ['Columns (columns59)'];
  const contentRow = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
