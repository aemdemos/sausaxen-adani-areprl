/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main row of columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Find all columns with significant class
  const columns = Array.from(row.children).filter(div => {
    // col-lg-* columns
    return /col-lg-\d+/.test(div.className);
  });

  // Compose cells for each non-empty column
  const cells = columns.map(col => {
    // If the column is empty, return empty string
    if (!col.textContent.trim() && !col.querySelector('img,video,iframe,a,ul,ol')) {
      return '';
    }
    // If there is only one child, use that child directly (to preserve reference)
    const directChildren = Array.from(col.childNodes);
    // If just one content child, use it. If multiple, wrap in a <div>
    if (directChildren.length === 1) {
      return directChildren[0]; // this may be text or an element
    } else {
      const wrapper = document.createElement('div');
      directChildren.forEach(node => wrapper.appendChild(node));
      return wrapper;
    }
  });

  // Only keep columns that aren't completely empty
  const filteredCells = cells.filter(cell => {
    if (typeof cell === 'string') {
      return cell.trim() !== '';
    } else if (cell instanceof Element) {
      return cell.textContent.trim() !== '' || cell.querySelector('img,video,iframe,a,ul,ol');
    }
    return false;
  });

  // Build the table rows
  const tableRows = [
    ['Columns (columns29)'],
    filteredCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
