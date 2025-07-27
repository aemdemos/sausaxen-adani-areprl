/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards70)'];

  // Find the .bootstrape-stage
  const stage = element.querySelector(':scope .bootstrape-stage');
  if (!stage) return;

  // Get all direct child .bootstrape-item elements
  const cardItems = Array.from(stage.querySelectorAll(':scope > .bootstrape-item'));

  // Track uniqueness to avoid carousel duplicates
  const seen = new Set();
  const rows = [];

  for (const item of cardItems) {
    const card = item.querySelector('.item');
    if (!card) continue;
    const img = card.querySelector('img');
    const p = card.querySelector('p');
    const link = p ? p.querySelector('a') : null;
    const label = link ? link.textContent.trim() : '';
    // Compose unique key
    const key = (img ? img.src : '') + '|' + label;
    if (seen.has(key)) continue;
    seen.add(key);
    // Compose the text content cell
    const textCell = document.createElement('div');
    if (label) {
      const strong = document.createElement('strong');
      strong.textContent = label;
      textCell.appendChild(strong);
    }
    // Add description text from <p> after removing any <a>
    if (p) {
      const pClone = p.cloneNode(true);
      // Remove the link node (the label) if present
      const linkInP = pClone.querySelector('a');
      if (linkInP) linkInP.remove();
      const desc = pClone.textContent.trim();
      if (desc) {
        // Add <br> if there's already a label/title
        if (label) textCell.appendChild(document.createElement('br'));
        textCell.append(desc);
      }
    }
    rows.push([img, textCell]);
  }

  if (rows.length > 0) {
    const cells = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
