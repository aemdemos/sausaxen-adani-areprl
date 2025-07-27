/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns: left (video), right (heading, text, carousel)
  const row = element.querySelector('.row.propelling--decoration--all-content');
  if (!row) return;
  const cols = Array.from(row.children).filter(c => c.classList.contains('col-md-5') || c.classList.contains('col-md-7'));
  if (cols.length !== 2) return;

  // Left column: just reference the first col's immediate content (big--img)
  const leftCellContent = [];
  const bigImg = cols[0].querySelector('.big--img');
  if (bigImg) leftCellContent.push(bigImg);

  // Right column: heading, numbers, paragraph, carousel
  const rightCellContent = [];
  const contentDiv = cols[1].querySelector('.content--div');
  if (contentDiv) rightCellContent.push(contentDiv);
  const carouselDiv = cols[1].querySelector('.carousel--div');
  if (carouselDiv) rightCellContent.push(carouselDiv);

  // Structure for Columns (columns60) block
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns60)'],
    [leftCellContent, rightCellContent]
  ], document);

  element.replaceWith(table);
}
