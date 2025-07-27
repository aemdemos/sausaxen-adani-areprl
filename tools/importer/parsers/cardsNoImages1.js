/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row matching the block exactly
  const headerRow = ['Cards (cardsNoImages1)'];

  // Collect card content: heading (h3) and description (p)
  const children = Array.from(element.children);
  const cardContent = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Only include elements with content
    if (child.textContent && child.textContent.trim() !== '') {
      cardContent.push(child);
    }
  }
  // Only create the card row if there's content
  if (cardContent.length === 0) {
    // If empty, remove the element and do nothing
    element.remove();
    return;
  }

  const cardRow = [cardContent];
  const tableData = [headerRow, cardRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
