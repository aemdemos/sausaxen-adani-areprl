/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get absolute URLs
  function toAbsoluteUrl(url) {
    if (!url) return '';
    const a = document.createElement('a');
    a.href = url;
    return a.href;
  }

  // Prepare the table header
  const headerRow = ['Carousel (carousel15)'];
  const cells = [headerRow];

  // Get the list of slides (direct children of .bootstrape-stage)
  const stageOuter = element.querySelector('.bootstrape-stage-outer');
  let stage = stageOuter && stageOuter.querySelector('.bootstrape-stage');

  if (stage) {
    // We'll keep track of seen slides by image src + heading
    const uniqueSet = new Set();
    const items = Array.from(stage.querySelectorAll(':scope > .bootstrape-item'));
    items.forEach((item) => {
      // Image in first cell
      const img = item.querySelector('.plant-placeholder img');
      let imageCell = '';
      if (img) {
        // Set absolute src (if not already)
        const src = img.getAttribute('src');
        img.setAttribute('src', toAbsoluteUrl(src));
        imageCell = img;
      }

      // Second cell: text content from plant-desc (or fallback col-lg-4)
      let contentCell = [];
      let textSection = item.querySelector('.plant-desc') || item.querySelector('.col-lg-4');
      if (textSection) {
        // Reference existing child nodes (don't clone)
        Array.from(textSection.childNodes).forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() === 'h3') {
              // Convert to h2 for semantics
              const h2 = document.createElement('h2');
              h2.innerHTML = node.innerHTML;
              contentCell.push(h2);
            } else if (node.tagName.toLowerCase() === 'ul') {
              // Each li as a p with its text (strip icons)
              Array.from(node.querySelectorAll('li')).forEach((li) => {
                // Remove spans (icon images)
                const liCopy = li.cloneNode(true);
                liCopy.querySelectorAll('span').forEach(span => span.remove());
                const text = liCopy.textContent.trim();
                if (text) {
                  const p = document.createElement('p');
                  p.textContent = text;
                  contentCell.push(p);
                }
              });
            } else if (
              node.tagName.toLowerCase() === 'p' &&
              node.querySelector('a') &&
              node.classList.contains('mb-3')
            ) {
              // For CTA p > a
              const a = node.querySelector('a');
              if (a) {
                const p = document.createElement('p');
                const link = document.createElement('a');
                link.href = toAbsoluteUrl(a.getAttribute('href'));
                link.textContent = a.textContent;
                p.appendChild(link);
                contentCell.push(p);
              }
            } else if (node.tagName.toLowerCase() === 'p') {
              // Other p tags (e.g., 'Featured')
              const p = document.createElement('p');
              p.innerHTML = node.innerHTML;
              contentCell.push(p);
            }
          }
        });
      }
      // Filter out empty elements and whitespace
      contentCell = contentCell.filter(e => {
        if (typeof e === 'string') return e.trim().length > 0;
        if (e.textContent) return e.textContent.trim().length > 0;
        return true;
      });
      if (!contentCell.length) contentCell = [''];

      // Use image src + first heading as slide identity
      const heading = contentCell.find(e => e.tagName && e.tagName.toLowerCase() === 'h2');
      const uniqueKey = (img ? img.src : '') + '|' + (heading ? heading.textContent.trim() : '');
      if (!uniqueSet.has(uniqueKey)) {
        uniqueSet.add(uniqueKey);
        cells.push([imageCell, contentCell]);
      }
    });
  }

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
