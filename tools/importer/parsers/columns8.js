/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers (col-lg-6)
  const cols = Array.from(element.querySelectorAll(':scope .container > .row > .col-lg-6'));

  // If no columns found, do nothing (graceful handling)
  if (!cols.length) return;

  // For each column, create a wrapper <div> containing heading and box
  const colsContent = cols.map((col) => {
    const frag = document.createElement('div');
    // Heading (should be h2)
    const heading = col.querySelector('h2');
    if (heading) frag.appendChild(heading);
    // The main box (should be .p-4.bg-white)
    const box = col.querySelector('.p-4.bg-white');
    if (box) frag.appendChild(box);
    return frag;
  });

  // Only make a columns block if there is at least one column
  if (colsContent.length) {
    const rows = [
      ['Columns (columns8)'],
      colsContent
    ];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
