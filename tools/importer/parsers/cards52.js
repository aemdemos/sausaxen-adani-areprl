/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards52) block
  const cells = [['Cards (cards52)']];

  // Get the carousel inner content
  const itemData = element.querySelector('.item-data-carousel1');
  if (!itemData) return;

  // There are pairs of: .left--image-leader1 (image), followed by .right--data-leader1 (text)
  const imageDivs = itemData.querySelectorAll('.left--image-leader1');
  const textDivs = itemData.querySelectorAll('.right--data-leader1');
  
  // Defensive check: if the pairs are not matched, only process up to the min length
  const pairCount = Math.min(imageDivs.length, textDivs.length);
  
  for (let i = 0; i < pairCount; i++) {
    // Image cell
    const img = imageDivs[i].querySelector('img');
    // Text cell: preserve heading, designation and description
    const name = textDivs[i].querySelector('.NameOfTheLeader .name--blue--leader');
    const designation = textDivs[i].querySelector('.DesignationOfTheLeader .light--color--text');
    const description = textDivs[i].querySelector('.DesignationOfDescription .text-dark');
    // Combine content keeping semantic order and skipping missing
    const textCell = [];
    if (name) textCell.push(name);
    if (designation) textCell.push(designation);
    if (description) textCell.push(description);
    // Only add card if we have image and at least one text content
    if (img && textCell.length) {
      cells.push([img, textCell]);
    }
  }
  // Only replace if at least one card was parsed
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
