/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row exactly as required
  const cells = [['Cards (cards66)']];

  // Get all visible card wrappers
  const cardWrappers = element.querySelectorAll('.schedule-row-loop-div > [id="loc-id"]');

  cardWrappers.forEach(card => {
    if (card.style.display === 'block') {
      // First cell: image (reference the existing element)
      const img = card.querySelector('.project-placeholder img');
      // Second cell: collect all relevant text content
      const details = card.querySelector('.project-details');
      const cellContent = [];
      if (details) {
        // Heading
        const h4 = details.querySelector('h4');
        if (h4) cellContent.push(h4);
        // List (ul)
        const ul = details.querySelector('ul');
        if (ul) cellContent.push(ul);
        // Any additional text nodes (e.g. paragraphs) not in ul or h4
        details.childNodes.forEach(node => {
          // Only process non-empty paragraph nodes that aren't h4 or ul
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === 'p' &&
            node.textContent && node.textContent.trim() &&
            node !== h4 && node !== ul
          ) {
            cellContent.push(node);
          }
        });
      }
      cells.push([
        img || '',
        cellContent.length === 1 ? cellContent[0] : cellContent
      ]);
    }
  });

  // Create and replace the block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
