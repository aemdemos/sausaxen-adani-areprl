/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as example
  const cells = [['Cards (cards14)']];

  // Find all card columns
  const cards = element.querySelectorAll(':scope > .col-lg-4.sus-main.padd-box');
  cards.forEach(card => {
    // Find anchor for link and scope
    const cardLink = card.querySelector('a');
    
    // 1st cell: image reference (do not clone or modify, reference directly)
    const img = card.querySelector('.bg-images img');

    // 2nd cell: title as heading and description if any
    const textDiv = card.querySelector('.sustainability-block');
    let textContent = [];
    if (textDiv) {
      // Heading extraction
      const h3 = textDiv.querySelector('h3');
      if (h3) {
        // Strong for heading
        const strong = document.createElement('strong');
        strong.textContent = h3.textContent.trim();
        textContent.push(strong);
      }
      // Description/paragraph extraction (if present with text)
      const p = textDiv.querySelector('p');
      if (p && p.textContent.trim().length > 0) {
        textContent.push(document.createElement('br'));
        textContent.push(p);
      }
    }
    // Row: [image, text content]
    cells.push([
      img,
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create the cards block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace source element
  element.replaceWith(table);
}
