/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel
  const carousel = element.querySelector('.bootleggers.bootstrape-carousel');
  if (!carousel) return;
  
  // Locate the stage containing all slides
  const stage = carousel.querySelector('.bootstrape-stage');
  if (!stage) return;

  // Get all non-cloned .bootstrape-item slides
  let items = Array.from(stage.querySelectorAll(':scope > .bootstrape-item:not(.cloned)'));
  // Fallback: if no non-cloned found, dedupe all by first encountered image src
  if (!items.length) {
    const deduped = [];
    const seen = new Set();
    Array.from(stage.querySelectorAll(':scope > .bootstrape-item')).forEach(item => {
      const img = item.querySelector('img');
      if (img && !seen.has(img.getAttribute('src'))) {
        seen.add(img.getAttribute('src'));
        deduped.push(item);
      }
    });
    items = deduped;
  }

  // Table rows: header first
  const rows = [['Carousel (carousel24)']];

  // Each row: [image, empty string (no text in these slides)]
  items.forEach(item => {
    // Reference the existing <img> element
    const img = item.querySelector('img');
    if (!img) return;
    // The src is in url('...') format; extract the actual URL
    let src = img.getAttribute('src') || '';
    src = src.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    // We use the existing img but must update the src property on the element
    img.src = src;
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
