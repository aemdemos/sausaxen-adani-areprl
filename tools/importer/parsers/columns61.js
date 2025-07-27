/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell/column
  const headerRow = ['Columns (columns61)'];

  // Each immediate child div is a column
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: only process non-empty columns
  const columns = colDivs.map((col) => {
    const stats = col.querySelector('.stats');
    if (!stats) return '';
    const cellContent = [];
    // Add <img>
    const img = stats.querySelector('img');
    if (img) cellContent.push(img);
    // Add <strong> for main stat, <span> for description
    const p = stats.querySelector('p');
    if (p) {
      // Collect text nodes from <p> for main stat
      const textNodes = Array.from(p.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      textNodes.forEach(n => {
        const strong = document.createElement('strong');
        strong.textContent = n.textContent.trim();
        cellContent.push(strong);
      });
      const span = p.querySelector('span');
      if (span && span.textContent.trim()) {
        cellContent.push(span);
      }
    }
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  });

  // Build the block table: header is a single column, second row as many columns as stats
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // 1 column
    columns    // N columns, as needed
  ], document);

  element.replaceWith(table);
}
