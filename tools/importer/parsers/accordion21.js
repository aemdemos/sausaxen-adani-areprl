/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.accordion.investor-faq');
  if (!accordion) return;

  // The block table rows array
  const rows = [];
  // Header row (exact block name as given)
  rows.push(['Accordion (accordion21)']);

  // Each child .card under the accordion is an accordion item
  const cards = accordion.querySelectorAll(':scope > .card');
  cards.forEach(card => {
    // Title cell: get the text of .card-header > .card-title if present
    let title = '';
    const header = card.querySelector(':scope > .card-header');
    if (header) {
      const cardTitle = header.querySelector('.card-title');
      if (cardTitle) {
        title = cardTitle.textContent.trim();
      } else {
        title = header.textContent.trim();
      }
    }

    // Content cell: the corresponding .card-body
    let content = '';
    const body = card.querySelector(':scope > .card-body');
    if (body) {
      // If there is a single main container in the body, use that for resilience
      const mainContent = body.querySelector('.container.mt-4') || body;
      content = mainContent;
    }
    // Only push row if there is a title and content
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table using referenced elements
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with this block
  element.replaceWith(block);
}
