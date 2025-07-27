/* global WebImporter */
export default function parse(element, { document }) {
  // Select top-level columns
  const topLevelCols = element.querySelectorAll(':scope > div');
  if (topLevelCols.length < 2) return;

  // Left column: main area with 3 feature blocks
  const leftCol = topLevelCols[0];
  // Find the direct .row (contains the three features)
  const featuresRow = leftCol.querySelector(':scope > .row');
  const featureCols = featuresRow ? featuresRow.querySelectorAll(':scope > div') : [];

  // Defensive: Only if at least one feature is found
  const leftStackDiv = document.createElement('div');
  featureCols.forEach((featureCol) => {
    // Find the main link containing block
    const a = featureCol.querySelector('a');
    if (a) {
      leftStackDiv.appendChild(a);
    } else {
      // fallback: add the whole column if anchor not found
      leftStackDiv.appendChild(featureCol);
    }
  });

  // Right column: report panel
  const rightCol = topLevelCols[1];
  let reportPanel = rightCol.querySelector(':scope > .p-5') || rightCol;

  // Table header row: must be ONE cell only!
  const headerRow = ['Columns (columns68)'];
  // Table body: TWO columns (leftStackDiv, reportPanel)
  const bodyRow = [leftStackDiv, reportPanel];

  // Compose table: header is single cell, body row is two cells
  const cells = [headerRow, bodyRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
