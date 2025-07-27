/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - matches example exactly
  const headerRow = ['Carousel (carousel43)'];

  // 2. Locate all slide blocks (each card)
  const slides = [];
  const scheduleRowLoopDiv = element.querySelector('.schedule-row-loop-div');
  if (scheduleRowLoopDiv) {
    // For each direct card column under the row loop
    scheduleRowLoopDiv.querySelectorAll(':scope > div').forEach((col) => {
      // Find image
      const img = col.querySelector('.project-placeholder img');
      // Find card details
      const details = col.querySelector('.project-details');
      let textCellContent = [];
      if (details) {
        // Heading: use the h4 as-is, but promote to h2 for semantic parity with the example
        const h4 = details.querySelector('h4');
        if (h4 && h4.textContent.trim()) {
          const h2 = document.createElement('h2');
          h2.textContent = h4.textContent.trim();
          textCellContent.push(h2);
        }
        // List items (<li>), each as a <p>
        details.querySelectorAll('ul > li').forEach(li => {
          // Remove icons, keep only visible text
          let text = '';
          li.childNodes.forEach(n => {
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
              text += n.textContent.trim() + ' ';
            }
          });
          if (text.trim()) {
            const p = document.createElement('p');
            p.textContent = text.trim();
            textCellContent.push(p);
          }
        });
        // Any other visible text (ignore empty <p>)
        details.querySelectorAll(':scope > p').forEach(p => {
          if (p.textContent && p.textContent.trim()) {
            const pCopy = document.createElement('p');
            pCopy.textContent = p.textContent.trim();
            textCellContent.push(pCopy);
          }
        });
      }
      // Fallback for empty text cell
      if (!textCellContent.length) textCellContent = '';
      // Compose row: always 2 columns
      slides.push([
        img,
        textCellContent
      ]);
    });
  }
  // 3. Build table and replace
  const cells = [headerRow, ...slides];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
