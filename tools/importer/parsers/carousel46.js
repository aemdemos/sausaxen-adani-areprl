/* global WebImporter */
export default function parse(element, { document }) {
  function makeAbsoluteUrl(src) {
    if (!src) return src;
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    if (src.startsWith('/')) return src;
    if (src.startsWith('-/')) return '/' + src;
    return src;
  }

  // Locate the carousel root
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;
  // Get all .bootstrape-item slides (including .cloned and non-cloned)
  let items = Array.from(carousel.querySelectorAll('.bootstrape-stage .bootstrape-item, > .bootstrape-item'));
  // Deduplicate slides by a signature of visual+heading+description
  const seen = new Set();
  const getSignature = (item) => {
    const img = item.querySelector('img');
    if (img) return 'img:' + img.src;
    const video = item.querySelector('video source');
    if (video) return 'vid:' + video.src;
    const h5 = item.querySelector('h5');
    if (h5) return 'h5:' + h5.textContent.trim();
    return item.textContent.trim().slice(0, 40);
  };
  items = items.filter(item => {
    const sig = getSignature(item);
    if (seen.has(sig)) return false;
    seen.add(sig);
    return true;
  });

  const rows = [['Carousel (carousel46)']];

  items.forEach(item => {
    // VISUAL CELL
    let visualCell = null;
    const img = item.querySelector('img');
    if (img) {
      img.src = makeAbsoluteUrl(img.getAttribute('src'));
      visualCell = img;
    } else {
      const video = item.querySelector('video');
      const source = video && video.querySelector('source');
      if (source && source.getAttribute('src')) {
        const link = document.createElement('a');
        link.href = makeAbsoluteUrl(source.getAttribute('src'));
        link.textContent = 'Video';
        visualCell = link;
      }
    }

    // TEXT CELL: gather all content (headings, paragraphs, ctas, etc)
    let textContent = [];
    const btnContainer = item.querySelector('.carousel-button-container');
    if (btnContainer) {
      // h5 as heading
      const h5 = btnContainer.querySelector('h5');
      if (h5) {
        const h3 = document.createElement('h3');
        h3.innerHTML = h5.innerHTML;
        textContent.push(h3);
      }
      // .left--border-banner (contains paragraphs, maybe cta)
      const border = btnContainer.querySelector('.left--border-banner');
      if (border) {
        // All non-empty p's
        border.querySelectorAll('p').forEach(p => {
          if (p.textContent && p.textContent.trim()) textContent.push(p);
        });
        // CTAs inside .same-line-data (usually a link)
        border.querySelectorAll('.same-line-data a').forEach(a => textContent.push(a));
      }
    }
    // If no btnContainer or textContent still empty, collect h5/p/a directly under .item
    if (textContent.length === 0) {
      item.querySelectorAll('h5').forEach(h5 => {
        const h3 = document.createElement('h3');
        h3.innerHTML = h5.innerHTML;
        textContent.push(h3);
      });
      item.querySelectorAll('p').forEach(p => {
        if (p.textContent && p.textContent.trim()) textContent.push(p);
      });
      item.querySelectorAll('a').forEach(a => textContent.push(a));
    }
    // Fallback: if still empty, try all direct children except visuals
    if (textContent.length === 0) {
      Array.from(item.children).forEach(child => {
        if (!child.matches('img, video')) textContent.push(child);
      });
    }
    // Remove duplicates and empty nodes
    textContent = textContent.filter((el, idx, arr) => {
      if (!el) return false;
      if (typeof el === 'string') return el.trim();
      if (el.nodeType === 3) return el.textContent.trim();
      if (el.nodeType === 1) return el.textContent.trim();
      return arr.indexOf(el) === idx;
    });

    rows.push([
      visualCell,
      textContent.length ? textContent : ''
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
