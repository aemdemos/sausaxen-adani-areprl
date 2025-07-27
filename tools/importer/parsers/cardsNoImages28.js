/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as defined in the spec
  const cells = [
    ['Cards (cardsNoImages28)']
  ];

  // Get all immediate card children
  const cardDivs = element.querySelectorAll(':scope > .col-md-4');
  cardDivs.forEach((cardDiv) => {
    // Find the .tariff-block inside each .col-md-4
    const tariffBlock = cardDiv.querySelector('.tariff-block');
    if (tariffBlock) {
      // Find the <p> tag with the link inside the tariff block
      const p = tariffBlock.querySelector('p');
      if (p && p.textContent.trim()) {
        // Reference the existing <p> element directly
        cells.push([p]);
      }
    }
  });

  // Only create the table if there's at least one card row
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}