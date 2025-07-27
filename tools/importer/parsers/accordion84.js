/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  const rows = [];
  // Header row: exactly as per requirements, one column only
  rows.push(['Accordion (accordion84)']);

  // Each .card is an accordion item: [title, content]
  const cards = accordion.querySelectorAll(':scope > .card');
  cards.forEach((card) => {
    // Title: grab the header text (prefer .card-title, fallback to .card-header text)
    let titleContent = '';
    const cardHeader = card.querySelector('.card-header');
    if (cardHeader) {
      const cardTitle = cardHeader.querySelector('.card-title');
      if (cardTitle) {
        titleContent = cardTitle.textContent.trim();
      } else {
        titleContent = cardHeader.textContent.trim();
      }
    }

    // Content: reference all of .card-body's children in a fragment for maximum content retention
    let contentContent = '';
    const cardBody = card.querySelector('.card-body');
    if (cardBody) {
      const contentFragment = document.createDocumentFragment();
      Array.from(cardBody.childNodes).forEach((node) => {
        contentFragment.appendChild(node);
      });
      contentContent = contentFragment;
    }

    // Each accordion item is a row of [title, content]
    rows.push([titleContent, contentContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
