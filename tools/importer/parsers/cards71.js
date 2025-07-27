/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirement
  const headerRow = ['Cards (cards71)'];
  const cells = [headerRow];
  // Find the carousel stage
  const stage = element.querySelector('.bootstrape-stage');
  if (!stage) return;
  // Used for deduplication based on image src and text
  const seen = new Set();
  // Get all direct bootstrape-item children (can be cloned or not, doesn't matter)
  const items = Array.from(stage.querySelectorAll(':scope > .bootstrape-item'));
  for (const item of items) {
    const card = item.querySelector('.item');
    if (!card) continue;
    // Get image (mandatory)
    const img = card.querySelector('img');
    // Get text block (the <p> with the <a>, possibly more later)
    const ps = Array.from(card.querySelectorAll('p'));
    // Defensive: if no img or no p, skip
    if (!img || ps.length === 0) continue;
    // deduplicate by img src and anchor text
    const a = ps[ps.length - 1].querySelector('a');
    const key = img.getAttribute('src') + '|' + (a ? a.textContent.trim() : '');
    if (seen.has(key)) continue;
    seen.add(key);
    // Compose right cell: Include all <p> from the card (not cloned, referenced)
    // If you want to preserve only the last <p> (which is always present), but if in future more text, this will flexibly include it
    let textCell;
    if (ps.length === 1) {
      textCell = ps[0];
    } else {
      // Use a div to hold all referenced <p>s
      const wrapper = document.createElement('div');
      ps.forEach(p => wrapper.appendChild(p));
      textCell = wrapper;
    }
    cells.push([img, textCell]);
  }
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
