/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per requirements
  const cells = [['Cards (cards79)']];
  // Get each card column (director tile)
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach(cardDiv => {
    const link = cardDiv.querySelector('a');
    if (!link) return;
    const card = link.querySelector('.card');
    if (!card) return;
    // Image (always present)
    const img = card.querySelector('img');
    // Card body (text)
    const cardBody = card.querySelector('.card-body');
    if (!img || !cardBody) return;
    // Compose text cell, maintaining all structure
    // Use the actual elements from the live DOM, not clones, so structure, links, and formatting are preserved
    const elements = [];
    // Title, usually h4
    const title = cardBody.querySelector('h4.card-title');
    if (title) elements.push(title);
    // Description, usually p
    const desc = cardBody.querySelector('p.card-text');
    if (desc) elements.push(desc);
    // Optionally add a CTA if desired (not in source, but could be useful, based on block definition)
    // However, example markdown does NOT include CTA, so omit
    // Add row if we got both sides
    if (img && elements.length > 0) {
      cells.push([img, elements]);
    }
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
