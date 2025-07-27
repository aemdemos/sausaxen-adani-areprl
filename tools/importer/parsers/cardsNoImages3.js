/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table header row
  const headerRow = ['Cards (cardsNoImages3)'];

  // Find all immediate card columns within the block
  // Defensive: allow for variations in how the .row is structured
  let cardCols = [];
  const container = element.querySelector('.container');
  if (container) {
    const row = container.querySelector('.row');
    if (row) {
      cardCols = Array.from(row.children).filter(col => col.classList.contains('col-lg-4'));
    } else {
      cardCols = Array.from(container.children).filter(col => col.classList.contains('col-lg-4'));
    }
  } else {
    cardCols = Array.from(element.querySelectorAll('.col-lg-4'));
  }

  // For each card, return its content block (the card body div)
  const rows = cardCols.map(col => {
    // Try to find the card content
    let cardContent = col.querySelector('.bg-white.p-4.h-100.boxzoom');
    if (!cardContent) {
      // Fallback: if the structure is not as expected, use the col itself
      cardContent = col;
    }
    return [cardContent];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}
