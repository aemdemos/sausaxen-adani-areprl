/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must match exactly
  const headerRow = ['Hero (hero9)'];

  // Second row: background image (none in this HTML)
  const backgroundImageRow = [''];

  // Third row: All relevant content (headline, CTA) in a single cell
  let contentCell = '';
  const container = element.querySelector('.container');
  if (container) {
    const h2 = container.querySelector('h2');
    if (h2) {
      // Separate headline (text only) and CTA (link)
      // The headline is all h2 text before the span
      let headlineText = '';
      let ctaLink = null;
      h2.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('span')) {
          const link = node.querySelector('a');
          if (link) ctaLink = link;
        } else if (node.nodeType === Node.TEXT_NODE) {
          headlineText += node.textContent;
        }
      });
      // Create headline element ONLY if text exists (use heading for semantic meaning)
      let cellContent = [];
      if (headlineText && headlineText.trim()) {
        const headline = document.createElement('h1');
        headline.textContent = headlineText.trim();
        cellContent.push(headline);
      }
      if (ctaLink) {
        // Reference the existing link directly (do not clone)
        // Add a <br> for better separation if headline exists
        if (cellContent.length > 0) {
          cellContent.push(document.createElement('br'));
        }
        cellContent.push(ctaLink);
      }
      // If nothing found, default to empty string (as required by guideline)
      contentCell = cellContent.length > 0 ? cellContent : '';
    }
  }

  const contentRow = [contentCell];

  const cells = [headerRow, backgroundImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
