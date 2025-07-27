/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per block spec
  const headerRow = ['Cards (cards76)'];

  // Each card is a .col-lg-4.sus-main.padd-box under the first nested .row
  const cardCols = element.querySelectorAll('.row .col-lg-4.sus-main.padd-box');
  const rows = [];

  cardCols.forEach(cardCol => {
    // First cell: image (mandatory)
    const img = cardCol.querySelector('.bg-images img');
    // Second cell: text content (heading + any description), use the .sustainability-block as a whole
    const textContent = cardCol.querySelector('.sustainability-block');
    // Defensive: ensure elements exist
    rows.push([
      img || document.createTextNode(''),
      textContent || document.createTextNode('')
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
