/* global WebImporter */
export default function parse(element, { document }) {
  // Header as specified
  const headerRow = ['Cards (cards37)'];
  const cells = [headerRow];

  // .bootstrape-stage holds the cards
  const stage = element.querySelector('.bootstrape-stage');
  if (!stage) return;
  // Only direct children of stage: .bootstrape-item
  const cardItems = stage.querySelectorAll(':scope > .bootstrape-item');

  cardItems.forEach((cardItem) => {
    // Inside .bootstrape-item > .item > .CatchImg
    const item = cardItem.querySelector(':scope > .item');
    if (!item) return;
    const catchImg = item.querySelector(':scope > .CatchImg');
    let img = '';
    if (catchImg) {
      const foundImg = catchImg.querySelector('img');
      if (foundImg) img = foundImg;
    }
    // Find .card-body inside .CatchImg
    let cardBody = '';
    if (catchImg) {
      cardBody = catchImg.querySelector(':scope > .card-body');
    }
    if (!cardBody) return;

    // Build text cell: heading, description, CTA (keep original DOM nodes for semantic meaning)
    const textNodes = [];
    // Heading: strong inside p
    const headingStrong = cardBody.querySelector('p strong');
    if (headingStrong && headingStrong.parentElement) {
      textNodes.push(headingStrong.parentElement);
    }
    // Description: the *next* p (not containing strong)
    const ps = cardBody.querySelectorAll('p');
    for (let i = 0; i < ps.length; i++) {
      if (!ps[i].querySelector('strong')) {
        textNodes.push(ps[i]);
        break;
      }
    }
    // CTA: first <a> in cardBody, if any
    const cta = cardBody.querySelector('a');
    if (cta) {
      // Add a line break between description and CTA only if both exist
      if (textNodes.length > 0) {
        textNodes.push(document.createElement('br'));
      }
      textNodes.push(cta);
    }
    // Add table row: [image, [text nodes]]
    cells.push([
      img,
      textNodes
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
