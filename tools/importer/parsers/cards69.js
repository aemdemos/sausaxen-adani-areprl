/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards69)'];

  // Each direct child .col-md-4 is a card
  const cards = Array.from(element.querySelectorAll(':scope > .col-md-4'));

  const rows = cards.map((card) => {
    // Get image (mandatory, per spec)
    const img = card.querySelector('img');

    // Get all <p>s inside the card
    const paragraphs = Array.from(card.querySelectorAll('p'));

    // Title: first <p>, often with <strong>
    let titleEl = null;
    if (paragraphs[0]) {
      // Use existing <p> node for semantic preservation
      titleEl = paragraphs[0];
    }

    // Description: last <p> if more than one, otherwise blank
    let descEl = null;
    if (paragraphs.length > 1 && paragraphs[paragraphs.length - 1]) {
      // Avoid duplicating if only one <p>
      descEl = paragraphs[paragraphs.length - 1];
    }

    // Compose the content cell: title + (if present) description
    const cellContent = [];
    if (titleEl) cellContent.push(titleEl);
    if (descEl && descEl !== titleEl) cellContent.push(descEl);

    // Each row: [image, content]
    return [img, cellContent];
  });

  // Table structure: header, then each card as a row
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
