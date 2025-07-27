/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main rows (each with up to 3 columns)
  const mainRows = element.querySelectorAll(':scope > div.row');
  if (!mainRows || mainRows.length < 2) return;

  // === FIRST ROW: Policies (left), Corporate Announcement (right) ===
  const firstRow = mainRows[0];
  const firstCols = firstRow.querySelectorAll(':scope > div');
  let policiesCell = null;
  let announcementCell = null;

  for (const col of firstCols) {
    const h3 = col.querySelector('h3.section-heading');
    if (h3 && /polic/i.test(h3.textContent)) {
      // Use the innermost content box for policies to ensure all text and links are present
      const deepBox = col.querySelector('.bg-white.p-5.h-100') || col;
      policiesCell = deepBox;
    } else if (h3 && /corporate announcement/i.test(h3.textContent)) {
      // Use the colored announcement box
      const annBox = col.querySelector('.position-relative.d-block.p-5.corporate-a') || col;
      announcementCell = annBox;
    }
  }

  // === SECOND ROW: Shareholding Patterns (left), Board and Committee Charters (right) ===
  const secondRow = mainRows[1];
  const secondCols = secondRow.querySelectorAll(':scope > div');
  let shareholdingCell = null;
  let chartersCell = null;

  for (const col of secondCols) {
    const h3 = col.querySelector('h3.section-heading');
    if (h3 && /shareholding/i.test(h3.textContent)) {
      shareholdingCell = col;
    } else if (col.querySelector('a[href*="board-and-committee-charters"]')) {
      // Reference the <a> element so that the whole block is clickable
      chartersCell = col.querySelector('a[href*="board-and-committee-charters"]');
    }
  }

  // === Build the Columns (columns5) block ===
  // Header row must be a single cell with exact text
  const headerRow = ['Columns (columns5)'];
  // Second row: policies, announcement
  const row2 = [policiesCell, announcementCell];
  // Third row: shareholding, board charters
  const row3 = [shareholdingCell, chartersCell];

  // Only include rows with at least one non-null cell (in case of missing data)
  const cells = [headerRow];
  if (policiesCell || announcementCell) cells.push(row2);
  if (shareholdingCell || chartersCell) cells.push(row3);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
