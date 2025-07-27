/* global WebImporter */
export default function parse(element, { document }) {
  // The .row contains multi-column layout
  const row = element.querySelector('.row');
  if (!row) return;

  // Gather all immediate .col-lg-* children for column logic
  const columns = Array.from(row.children).filter(div => div.className && div.className.match(/col-lg-\d+/));

  // For this block, left col is sidebar (social), main col is content, third col is empty
  // We'll make this a 2-column columns block: left = sidebar, right = content
  // If sidebar (social) is visually important, include it; otherwise, just main content (per screenshot, sidebar is not main content)
  // Screenshot has *one* column, so only main content (col-lg-11)

  // Find main content column
  const mainCol = row.querySelector('.col-lg-11');
  if (!mainCol) return;

  // Header row for Columns block
  const headerRow = ['Columns (columns73)'];

  // Get all children of the main column, except empty p
  const contentNodes = [];
  Array.from(mainCol.childNodes).forEach(node => {
    // Exclude empty <p> elements
    if (node.nodeType === 1 && node.tagName === 'P' && !node.textContent.trim()) return;
    // Exclude whitespace-only text nodes
    if (node.nodeType === 3 && !node.textContent.trim()) return;
    contentNodes.push(node);
  });

  // Final structure: header row, then content as single column
  const tableRows = [
    headerRow,
    [contentNodes]
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
