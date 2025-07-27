/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner .row that contains the cards
  let cardRow = null;
  // Try to find the row with the cards
  // The top level is .row > .col-lg-12 > .row > .col-lg-4
  const outerCol = element.querySelector(':scope > .col-lg-12');
  if (outerCol) {
    cardRow = outerCol.querySelector(':scope > .row');
  }
  // fallback if not found
  if (!cardRow) {
    cardRow = element.querySelector(':scope > .row');
  }
  if (!cardRow) return;

  // Each card is a direct child div.col-lg-4
  const cardDivs = Array.from(cardRow.children).filter(div => div.classList.contains('col-lg-4'));
  const cells = [['Cards (cards77)']];

  cardDivs.forEach(card => {
    // Card link wrapper
    const link = card.querySelector('a');
    let img = null;
    // image is inside link > .bg-images > img
    if (link) {
      const bgImages = link.querySelector('.bg-images');
      if (bgImages) {
        img = bgImages.querySelector('img');
      }
    }
    // Text cell: reference the sustainability-block div if it exists
    let textCell = null;
    if (link) {
      const block = link.querySelector('.sustainability-block');
      if (block) {
        textCell = block;
      } else {
        // fallback: just use the <a>
        textCell = link;
      }
    }
    cells.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
