/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const rows = [['Cards (cards18)']];

  // Find all card columns
  const cardCols = element.querySelectorAll('.row > div');
  cardCols.forEach((col) => {
    // Each card's root is .trans-stats
    const card = col.querySelector('.trans-stats');
    if (!card) return;

    // Image (first img inside the card)
    const img = card.querySelector('img');

    // Heading and description from the h3, possibly with <br>
    const h3 = card.querySelector('h3');
    let headingElem = null;
    let descElem = null;
    if (h3) {
      // Split based on <br> (DOM approach)
      const nodes = Array.from(h3.childNodes);
      // Heading is the first text node
      const headingText = (nodes[0] && nodes[0].textContent) ? nodes[0].textContent.trim() : '';
      if (headingText) {
        headingElem = document.createElement('strong');
        headingElem.textContent = headingText;
      }
      // Description is everything after the <br> (including text and elements)
      // Find the position of the <br> in the childNodes
      let brIndex = nodes.findIndex((n) => n.nodeName === 'BR');
      let descText = '';
      if (brIndex !== -1) {
        descText = nodes.slice(brIndex + 1).map((n) => n.textContent).join('').trim();
      }
      if (descText) {
        descElem = document.createElement('div');
        descElem.textContent = descText;
      }
    }
    // Build text cell: heading (bold) + <br> + description
    const textCell = [];
    if (headingElem) textCell.push(headingElem);
    if (headingElem && descElem) textCell.push(document.createElement('br'));
    if (descElem) textCell.push(descElem);
    // Add row (image in first cell, text in second)
    rows.push([img, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
