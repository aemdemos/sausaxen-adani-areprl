/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header
  const cells = [['Cards (cards11)']];
  // Find all visible card columns in the grid
  const cardRows = Array.from(element.querySelectorAll('.schedule-row-loop-div > [id="loc-id"]')).filter(card => card.style.display !== 'none' && card.classList.contains('show'));
  cardRows.forEach(card => {
    // Card image (first img in .project-placeholder)
    const img = card.querySelector('.project-placeholder img');
    // Card details container
    const details = card.querySelector('.project-details');
    // Compose the text cell referencing the actual DOM elements (not clones)
    const textCellParts = [];
    // Title (h4)
    const title = details.querySelector('h4');
    if (title) textCellParts.push(title);
    // Info list (ul)
    const ul = details.querySelector('ul');
    if (ul) textCellParts.push(ul);
    // Find all <p> elements in details (typically for CTA or possible extra text)
    const paragraphs = details.querySelectorAll('p');
    paragraphs.forEach(p => {
      // Only add if not empty or just &nbsp;
      if (p.textContent.trim() && (!/^\u00a0*$/.test(p.textContent))) {
        textCellParts.push(p);
      }
    });
    // Add any stray non-empty text nodes (for safety)
    Array.from(details.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        textCellParts.push(document.createTextNode(node.textContent.trim()));
      }
    });
    // If textCellParts is empty, fallback to blank string
    const textCell = textCellParts.length > 0 ? textCellParts : '';
    cells.push([img, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
