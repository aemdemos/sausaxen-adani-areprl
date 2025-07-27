/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: single column as in the markdown example
  const headerRow = ['Columns (columns42)'];

  // Find the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > .col-md-6'));

  // Fallback: if structure is unexpected, wrap whole block
  if (columns.length !== 2) {
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Helper to gather all row blocks in each column
  function buildColumnCell(col) {
    const subRows = Array.from(col.querySelectorAll(':scope > .row'));
    const cellDiv = document.createElement('div');
    subRows.forEach((row) => {
      const imgCol = row.querySelector('.col-md-2 img');
      const textCol = row.querySelector('.col-md-10');
      const statDiv = document.createElement('div');
      statDiv.style.display = 'flex';
      statDiv.style.alignItems = 'flex-start';
      if (imgCol) {
        statDiv.appendChild(imgCol);
      }
      if (textCol) {
        while (textCol.childNodes.length > 0) {
          statDiv.appendChild(textCol.childNodes[0]);
        }
      }
      cellDiv.appendChild(statDiv);
    });
    return cellDiv;
  }

  const leftCell = buildColumnCell(columns[0]);
  const rightCell = buildColumnCell(columns[1]);

  // The table should have a single header cell row, then a data row with 2 columns
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
