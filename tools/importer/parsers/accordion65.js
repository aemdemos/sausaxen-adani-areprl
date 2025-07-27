/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the block: exactly one cell/column
  const rows = [['Accordion (accordion65)']];

  // The .card element contains alternating .card-header and .card-body elements
  const card = element.querySelector('.card');
  if (!card) return;
  const children = Array.from(card.children);

  // Build content rows (each with 2 cells: [title, content])
  for (let i = 0; i < children.length; i++) {
    const header = children[i];
    if (!header.classList.contains('card-header')) continue;
    // Title: the .card-title anchor OR the header itself
    let titleEl = header.querySelector('.card-title') || header;

    // Find next .card-body
    let content = null;
    let j = i + 1;
    while (j < children.length) {
      if (children[j].classList.contains('card-body')) {
        content = children[j];
        break;
      }
      j++;
    }
    if (!content) continue; // Defensive: skip if matching body isn't found
    // Use .p-4 inside card-body if present, else card-body
    let contentEl = content.querySelector('.p-4') || content;

    // Each row after the header row should have exactly 2 columns
    rows.push([titleEl, contentEl]);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
