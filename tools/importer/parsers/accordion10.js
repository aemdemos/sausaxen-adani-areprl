/* global WebImporter */
export default function parse(element, { document }) {
  // Table header EXACTLY as in the example
  const headerRow = ['Accordion (accordion10)'];

  // Find the accordion block (only process if present)
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // For each accordion item (card), extract title and content
  const rows = [];
  const cards = accordion.querySelectorAll('.card');
  cards.forEach(card => {
    // Title cell: Use .card-header > .card-title if present, else .card-header
    let titleEl = card.querySelector('.card-header .card-title');
    if (!titleEl) {
      titleEl = card.querySelector('.card-header');
    }
    // Defensive: if still no title, use empty string
    let title = titleEl ? titleEl : '';
    // Content cell: .card-body's relevant child content
    let contentEl = card.querySelector('.card-body');
    let contentCell;
    if (contentEl) {
      // If .p-4 wrapper, use its children; else use .card-body's children
      let wrapper = contentEl.querySelector('.p-4') || contentEl;
      // Only collect element nodes and non-empty text nodes
      let nodes = Array.from(wrapper.childNodes).filter(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    } else {
      contentCell = '';
    }
    rows.push([title, contentCell]);
  });

  // Compose table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
