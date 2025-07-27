/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as in the example
  const headerRow = ['Hero (hero19)'];

  // Row 2: Background image (img from .bg-images)
  let bgImgElem = '';
  const bgImgDiv = element.querySelector('.bg-images');
  if (bgImgDiv) {
    const imgElem = bgImgDiv.querySelector('img');
    if (imgElem) {
      bgImgElem = imgElem;
    }
  }
  const imageRow = [bgImgElem];

  // Row 3: All non-breadcrumb content from .container (headings, subheadings, paragraphs, etc)
  let contentElements = [];
  const container = element.querySelector('.container');
  if (container) {
    Array.from(container.children).forEach(child => {
      // Exclude breadcrumbs (UL/NAV)
      if (child.tagName !== 'UL' && child.tagName !== 'NAV') {
        contentElements.push(child);
      }
    });
  }
  // If only one element, use the element itself, else array
  const contentCell = contentElements.length === 1 ? contentElements[0] : contentElements;
  const contentRow = [contentCell];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, imageRow, contentRow], document);
  element.replaceWith(table);
}
