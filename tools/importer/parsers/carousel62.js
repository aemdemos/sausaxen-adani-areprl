/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the exact block name
  const headerRow = ['Carousel (carousel62)'];

  // Find all slides (columns that are direct children of .row under each .bootstrape-item)
  const slides = [];
  const stage = element.querySelector('.bootstrape-stage');
  if (stage) {
    const items = Array.from(stage.querySelectorAll('.bootstrape-item'));
    items.forEach(item => {
      const row = item.querySelector('.item .row');
      if (row) {
        const cols = Array.from(row.children).filter(col => col.nodeType === 1 && col.matches('[class*="col-"]'));
        cols.forEach(col => {
          // Each data row must have two columns: first (image), second (text).
          // In this html, there is no image, so first cell is empty string.
          // Reference the original col element directly for the second cell.
          slides.push(['', col]);
        });
      }
    });
  }

  // Build rows: header row (1 cell), then each data row (2 cells)
  const tableRows = [headerRow, ...slides];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
