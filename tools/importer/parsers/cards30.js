/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the spec
  const headerRow = ['Cards (cards30)'];
  const cells = [headerRow];

  // Get all top-level card columns
  const cardCols = element.querySelectorAll(':scope .row > .col-lg-6');

  cardCols.forEach((col) => {
    // Find image
    let imgEl = null;
    // Try to find the .col-md-4, then img
    const imgCol = col.querySelector('.col-md-4');
    if (imgCol) {
      imgEl = imgCol.querySelector('img');
    }
    // Fallback: img in col
    if (!imgEl) {
      imgEl = col.querySelector('img');
    }

    // Find text content
    let textEl = null;
    // If .bg-gradient exists, get .col-md-8 inside it, else .col-md-8 in col
    let textBox = col.querySelector('.bg-gradient .col-md-8') || col.querySelector('.col-md-8');
    if (!textBox) {
      // fallback: try to find first h3 and get its parent
      const h3 = col.querySelector('h3');
      if (h3) textBox = h3.parentElement;
    }
    if (textBox) {
      // Reference the actual contents (not a clone)
      textEl = document.createElement('div');
      // Title (h3)
      const h3 = textBox.querySelector('h3');
      if (h3) textEl.appendChild(h3);
      // Description/quote (h4)
      const h4 = textBox.querySelector('h4');
      if (h4) textEl.appendChild(h4);
      // Read more (p.readmore)
      const pRead = textBox.querySelector('p.readmore');
      if (pRead) textEl.appendChild(pRead);
      // Signature (p.signature)
      const pSig = textBox.querySelector('p.signature');
      if (pSig) textEl.appendChild(pSig);
    }
    // Push only if both are found
    if (imgEl && textEl) {
      cells.push([imgEl, textEl]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
