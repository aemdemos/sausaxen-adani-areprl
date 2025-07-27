/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract all visible content from a column div, including text and images
  function getColContent(colDiv) {
    // Gather all non-modal direct children (to keep text, images, etc.)
    const nodes = [];
    Array.from(colDiv.childNodes).forEach((node) => {
      // Skip modals, but keep everything else
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('modal')) return;
      // Skip whitespace text nodes
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return;
      nodes.push(node);
    });
    // For each modal attached to this colDiv, add a link to its iframe
    colDiv.querySelectorAll('.modal.video').forEach((modal) => {
      const iframe = modal.querySelector('iframe');
      if (iframe && iframe.src) {
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = 'Watch Video';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        nodes.push(document.createElement('br'));
        nodes.push(link);
      }
    });
    return nodes;
  }

  // Header row (single column, as in example)
  const headerRow = ['Columns (columns38)'];

  // There are two main columns in the root: left (big), right (grid)
  const colDivs = element.querySelectorAll(':scope > div');
  const columns = [];

  // Left/main column
  if (colDivs[0]) {
    columns.push(getColContent(colDivs[0]));
  } else {
    columns.push([]);
  }

  // Right/grid column: collect each of the 4 col-lg-6 items in order, separated by <br><br>
  if (colDivs[1]) {
    const gridCols = colDivs[1].querySelectorAll(':scope > .row > .col-lg-6');
    const rightContent = [];
    gridCols.forEach((gridCol, idx) => {
      if (idx !== 0) {
        // Double break between grid items (to mimic vertical spacing)
        rightContent.push(document.createElement('br'));
        rightContent.push(document.createElement('br'));
      }
      getColContent(gridCol).forEach(child => rightContent.push(child));
    });
    columns.push(rightContent);
  } else {
    columns.push([]);
  }

  // Compose table and replace
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
