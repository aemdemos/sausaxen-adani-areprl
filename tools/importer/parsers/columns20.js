/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // First column: looks for the first image
  const firstCol = columns[0];
  let firstContent = '';
  const img = firstCol.querySelector('img');
  if (img) {
    firstContent = img;
  } else {
    // fallback, include all firstCol content
    firstContent = firstCol.childNodes.length > 0 ? Array.from(firstCol.childNodes) : '';
  }

  // Second column: looks for the main table > td
  const secondCol = columns[1];
  let secondContent = '';
  const td = secondCol.querySelector('table td');
  if (td) {
    // Use all child nodes to avoid wrapping <td> (avoid table nesting)
    secondContent = Array.from(td.childNodes);
  } else if (secondCol.childNodes.length > 0) {
    secondContent = Array.from(secondCol.childNodes);
  }

  // Table structure
  const rows = [
    ['Columns (columns20)'],
    [firstContent, secondContent]
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}
