/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel stage
  const stage = element.querySelector('.bootstrape-stage');
  if (!stage) return;

  // Get all .bootstrape-item (not just .cloned)
  const items = Array.from(stage.children).filter(child => child.classList.contains('bootstrape-item'));

  // Deduplication by heading + image src
  const seen = new Set();
  const columns = [];

  items.forEach(item => {
    const row = item.querySelector('.row');
    if (!row) return;
    // Find col with text
    const textCol = Array.from(row.children).find(c => c.classList.contains('col-lg-7'));
    // Find col with image
    const imgCol = Array.from(row.children).find(c => c.classList.contains('col-lg-5'));
    // Compose a content array for the column
    let contentParts = [];
    let headingText = '';
    let imgSrc = '';
    if (textCol) {
      Array.from(textCol.childNodes).forEach(n => {
        if (n.nodeType === Node.ELEMENT_NODE) {
          contentParts.push(n);
          if (/^H[1-6]$/i.test(n.tagName)) {
            headingText = n.textContent.trim();
          }
        } else if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = n.textContent.trim();
          contentParts.push(p);
        }
      });
    }
    if (imgCol) {
      const images = imgCol.querySelectorAll('img');
      images.forEach(img => {
        imgSrc = img.getAttribute('src') || '';
        contentParts.push(img);
      });
    }
    if (contentParts.length === 0) return;
    // Deduplication key
    const key = headingText + '|' + imgSrc;
    if (seen.has(key)) return;
    seen.add(key);
    columns.push(contentParts);
  });

  if (columns.length === 0) return;

  // The header row must be a single cell, matching the example
  const cells = [
    ['Columns (columns17)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
