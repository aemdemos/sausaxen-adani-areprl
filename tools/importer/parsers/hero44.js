/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: as required
  const headerRow = ['Hero (hero44)'];

  // Second row: no background image in this source
  const imageRow = [''];

  // Third row: gather all text content (heading and visible paragraphs), DOM order
  const container = element.querySelector('.container') || element;
  const contentElements = [];
  Array.from(container.children).forEach(child => {
    if (/^H[1-6]$/.test(child.tagName)) {
      contentElements.push(child);
    } else if (
      child.tagName === 'P' && 
      !child.classList.contains('d-none') &&
      !child.classList.contains('loadMore') &&
      !child.classList.contains('arrow')
    ) {
      contentElements.push(child);
    }
  });
  // If nothing found, provide blank cell (required by spec)
  const contentRow = [contentElements.length ? contentElements : ''];

  // Create table with required structure
  const table = WebImporter.DOMUtils.createTable(
    [headerRow, imageRow, contentRow],
    document
  );
  
  element.replaceWith(table);
}
