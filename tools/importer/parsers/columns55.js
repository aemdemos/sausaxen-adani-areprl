/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate img children of the element
  const imgs = Array.from(element.children).filter(el => el.tagName === 'IMG');
  // Prepare table data
  const cells = [
    // One header cell (1 column), regardless of the number of columns in the next row
    ['Columns (columns55)'],
    // Next row: one cell per image (number of columns)
    [...imgs]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure header cell spans all columns for HTML output
  const th = table.querySelector('th');
  if (th && imgs.length > 1) {
    th.colSpan = imgs.length;
  }
  element.replaceWith(table);
}
