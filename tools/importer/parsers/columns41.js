/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns: (image and links)
  // They are immediate children of the row: .col-md-8 and .col-md-4
  const cols = Array.from(element.querySelectorAll(':scope > div'));
  let leftCol = null, rightCol = null;
  if (cols.length >= 2) {
    leftCol = cols[0];
    rightCol = cols[1];
  } else {
    // Fallback: if the structure is unexpected, put the whole element in one cell
    leftCol = element;
    rightCol = '';
  }

  // Extract the image container from the leftCol
  let cell1Content = leftCol;
  const imgWrap = leftCol.querySelector('.image--investor');
  if (imgWrap) {
    cell1Content = imgWrap;
  }

  // Extract the investor links from the rightCol
  let cell2Content = rightCol;
  if (rightCol) {
    const linksWrap = rightCol.querySelector('.investor--links');
    if (linksWrap) {
      cell2Content = linksWrap;
    }
  }

  // The header row must be a single cell, even for multiple columns
  const headerRow = ['Columns (columns41)'];
  const contentRow = [cell1Content, cell2Content];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Adjust table so the header row (first row) has a single cell with colspan, as required by the markdown example
  const th = table.querySelector('tr:first-child > th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  element.replaceWith(table);
}
