/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];
  // Header row with exact text as specified
  rows.push(['Cards (cards67)']);

  // Get all visible card elements
  const cardNodes = Array.from(
    element.querySelectorAll('.schedule-row-loop-div > .column[style*="display: block"]')
  );

  cardNodes.forEach(card => {
    // First cell: image element (reference the existing element)
    const img = card.querySelector('.project-placeholder img');
    // Second cell: collect all text content in semantic structure
    const details = card.querySelector('.project-details');
    if (!details) return;
    const cellContent = [];
    // Add the location/title as <strong> in the top
    const h4 = details.querySelector('h4');
    if (h4 && h4.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = h4.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }
    // Add all <li> text (with icon if present), in a semantic list
    const ul = details.querySelector('ul');
    if (ul) {
      Array.from(ul.children).forEach(li => {
        // Get the icon (if present) and the text
        const icon = li.querySelector('img');
        const textParts = [];
        if (icon) textParts.push(icon);
        // The text after the icon (remove span if present)
        // We want all textNodes after the span/img
        Array.from(li.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textParts.push(document.createTextNode(' ' + node.textContent.trim()));
          }
        });
        // Wrap in a <div> for vertical spacing
        if (textParts.length) {
          const div = document.createElement('div');
          textParts.forEach(p => div.appendChild(p));
          cellContent.push(div);
        }
      });
    }
    rows.push([
      img, // reference only
      cellContent // array of elements
    ]);
  });

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
