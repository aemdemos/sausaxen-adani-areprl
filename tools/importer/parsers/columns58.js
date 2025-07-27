/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns within the section
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  const columns = Array.from(row.children);

  // Defensive: only continue if we have at least 2 columns
  if (columns.length < 2) return;

  // First column: typically the main content (left column)
  const leftCol = columns[0];
  // Second column: typically the image/side content (right column)
  const rightCol = columns[1];

  // Compose left column content (heading and all <p>)
  const leftColContent = [];
  // Heading (if present)
  const heading = leftCol.querySelector('h2, h1, h3, h4, h5, h6');
  if (heading) leftColContent.push(heading);
  // All immediate <p> inside leftCol
  const leftParagraphs = leftCol.querySelectorAll('p');
  leftParagraphs.forEach(p => leftColContent.push(p));

  // Compose right column content from inner .p-3
  let rightContentContainer = rightCol.querySelector('.p-3');
  if (!rightContentContainer) rightContentContainer = rightCol;
  const rightColContent = [];
  // Image (if present)
  const img = rightContentContainer.querySelector('img');
  if (img) rightColContent.push(img);
  // Sub-title (if present)
  const subtitle = rightContentContainer.querySelector('.sus-r-title');
  if (subtitle) rightColContent.push(subtitle);
  // Link (if present)
  const link = rightContentContainer.querySelector('a');
  if (link) rightColContent.push(link);

  // Build the table cells array per block spec:
  // Header row must match exactly "Columns (columns58)"
  const cells = [
    ['Columns (columns58)'],
    [leftColContent, rightColContent]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element in the DOM
  element.replaceWith(table);
}
