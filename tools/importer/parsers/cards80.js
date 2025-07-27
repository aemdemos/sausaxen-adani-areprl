/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const rows = [['Cards (cards80)']];
  // Get all visible card columns
  const cardCols = element.querySelectorAll('.row > .col-lg-4.mb-3:not(.d-none)');
  cardCols.forEach(col => {
    const anchor = col.querySelector('a');
    let imgEl = null;
    let textCellContent = [];
    if (anchor) {
      // Card image
      const bgImg = anchor.querySelector('.bg-images img');
      if (bgImg) {
        imgEl = bgImg;
      }
      // Text content: take all elements inside the .inv-downloads container except .bg-images and images
      const box = anchor.querySelector('.inv-downloads');
      if (box) {
        // Collect all children except .bg-images and img
        [...box.children].forEach(child => {
          if (
            !child.classList.contains('bg-images') &&
            !(child.tagName.toLowerCase() === 'img') &&
            child.textContent.trim() !== ''
          ) {
            textCellContent.push(child);
          }
        });
      }
    }
    // If no text element found, fallback to empty string
    if (textCellContent.length === 0) textCellContent = [''];
    rows.push([imgEl, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
