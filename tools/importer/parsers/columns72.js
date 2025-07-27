/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get all direct children of the row as columns
  const columns = Array.from(row.children);
  // We'll store the content for each column
  const columnCells = [];

  columns.forEach(col => {
    // Collect all meaningful content from each column
    const colContent = [];
    // For the sidebar with .social-share, use the .social-share ul
    const sidebar = col.querySelector('.social-share');
    if (sidebar) {
      colContent.push(sidebar);
    }
    // For general columns, collect direct children except empty elements
    Array.from(col.childNodes).forEach(node => {
      // Ignore whitespace-only text nodes
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return;
      // Ignore the sidebar ul if already added
      if (node.nodeType === Node.ELEMENT_NODE && sidebar && sidebar === node) return;
      // Ignore empty paragraphs
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P' && node.textContent.trim() === '') return;
      // Add all other content
      colContent.push(node);
    });
    // If the column had any content, add it; else, add an empty string
    if (colContent.length > 0) {
      columnCells.push(colContent.length === 1 ? colContent[0] : colContent);
    } else {
      columnCells.push('');
    }
  });

  // Remove trailing empty columns (if any)
  while (columnCells.length > 0 && (columnCells[columnCells.length-1] === '' || (Array.isArray(columnCells[columnCells.length-1]) && columnCells[columnCells.length-1].length === 0))) {
    columnCells.pop();
  }

  // Table header as per requirements
  const headerRow = ['Columns (columns72)'];
  const cells = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
