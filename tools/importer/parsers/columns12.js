/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name exactly as required
  const headerRow = ['Columns (columns12)'];

  // Find the main row with the columns
  const mainRow = element.querySelector('.row.footerPanel2');
  if (!mainRow) return;

  // Get all top-level column divs
  const cols = Array.from(mainRow.children);

  // We'll collect up to 4 columns as per the screenshot
  const contentCells = [];
  for (let i = 0; i < 4 && i < cols.length; i++) {
    const col = cols[i];
    // For each col, use its immediate content block as the cell
    // This ensures that all the links, lists, and groupings are preserved
    // 1st and 3rd column: just their main <div>
    // 2nd column: h5 + ul
    // 4th column: the .row.border-start.ft-logo
    if (i === 0 || i === 2) {
      const innerDiv = col.querySelector('div');
      if (innerDiv) {
        contentCells.push(innerDiv);
      } else {
        // fallback: all children
        contentCells.push(Array.from(col.children));
      }
    } else if (i === 1) {
      // h5 and ul (Sustainability)
      const h5 = col.querySelector('h5');
      const ul = col.querySelector('ul');
      const cellContent = [];
      if (h5) cellContent.push(h5);
      if (ul) cellContent.push(ul);
      if (cellContent.length) {
        contentCells.push(cellContent);
      } else {
        // fallback
        contentCells.push(Array.from(col.children));
      }
    } else if (i === 3) {
      // .row.border-start.ft-logo
      const logoRow = col.querySelector('.row.border-start.ft-logo');
      if (logoRow) {
        contentCells.push(logoRow);
      } else {
        // fallback
        contentCells.push(Array.from(col.children));
      }
    }
  }

  // Compose full table array
  const tableArr = [headerRow, contentCells];
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}
