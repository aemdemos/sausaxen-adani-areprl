/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards78)'];

  // Find all card containers within this block
  let cards = [];
  const firstRow = element.querySelector(':scope > .col-lg-12 > .row');
  if (firstRow) {
    cards = Array.from(firstRow.querySelectorAll(':scope > .col-lg-4.sus-main.padd-box'));
  } else {
    cards = Array.from(element.querySelectorAll(':scope > .col-lg-4.sus-main.padd-box'));
  }

  const rows = cards.map(card => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc); // push <p> even if empty
    return [img, textCell];
  });

  if (rows.length > 0) {
    const tableCells = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableCells, document);
    element.replaceWith(block);
  }
}
