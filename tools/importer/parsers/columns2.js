/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row containing columns
  const row = element.querySelector('.row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // LEFT COLUMN: include all children (usually just the image)
  const leftCol = cols[0];
  const leftContent = Array.from(leftCol.childNodes).filter(n => {
    // include images, elements, or non-empty text
    if (n.nodeType === 1) return true;
    if (n.nodeType === 3 && n.textContent.trim().length > 0) return true;
    return false;
  });

  // RIGHT COLUMN: include ALL visible content (headings, all paragraphs, links, etc.)
  const rightCol = cols[1];
  // Get all children except for empty <br> or empty text nodes
  const rightContent = Array.from(rightCol.childNodes).filter(n => {
    if (n.nodeType === 1 && (n.tagName !== 'BR')) return true;
    if (n.nodeType === 3 && n.textContent.trim().length > 0) return true;
    return false;
  });

  // Table header row (must be exactly as in the example, one cell)
  const cells = [
    ['Columns (columns2)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
