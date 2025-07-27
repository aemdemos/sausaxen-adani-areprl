/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children that are columns (.col-lg-*)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => {
    return Array.from(div.classList).some(cls => cls.startsWith('col-lg-'));
  });

  // Clean up empty <a> tags and empty <ul>/<li> elements
  columnDivs.forEach(col => {
    col.querySelectorAll('a').forEach(a => { if (!a.textContent.trim()) a.remove(); });
    col.querySelectorAll('ul,li').forEach(el => { if (!el.textContent.trim()) el.remove(); });
  });

  // Group columns into rows of 3 (to create a grid like the screenshot)
  const colsPerRow = 3;
  const dataRows = [];
  for (let i = 0; i < columnDivs.length; i += colsPerRow) {
    const row = columnDivs.slice(i, i + colsPerRow);
    dataRows.push(row);
  }

  // Build the table cells
  const cells = [
    ['Columns (columns51)'],
    ...dataRows
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
