/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images that are direct children of the element
  const imgs = Array.from(element.querySelectorAll('img'));

  // The header row must be a single cell, but span all columns
  // We'll create the table and then post-process thead/tr/th to set colspan
  const headerRow = ['Columns (columns56)'];
  const contentRow = imgs;
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Post-process: set header cell colspan to number of columns (images.length or at least 1)
  const thead = table.querySelector('thead') || table;
  const headerTr = thead.querySelector('tr');
  if (headerTr && headerTr.children.length === 1 && imgs.length > 1) {
    headerTr.children[0].setAttribute('colspan', imgs.length);
  }

  element.replaceWith(table);
}
