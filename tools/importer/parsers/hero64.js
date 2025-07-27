/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container div (should always exist in this structure)
  const container = element.querySelector(':scope > .container');
  if (!container) return; // Defensive: do nothing if structure is unexpected

  // Get all direct children of the container
  const children = Array.from(container.children);

  // 1. Table Header
  const headerRow = ['Hero (hero64)'];

  // 2. Background image row: none in the source HTML
  const backgroundRow = [''];

  // 3. Content row: collect heading, intro paragraph, and CTA (if any)
  const contentEls = [];
  // Heading (h1)
  const heading = children.find((el) => el.tagName === 'H1');
  if (heading) contentEls.push(heading);
  // Paragraphs (collect all except those that are empty or already added)
  const paragraphs = children.filter((el) => el.tagName === 'P' && el.textContent.trim() !== '');

  // Exclude CTA and intro paragraph if they are the same (handle missing cases)
  // We'll gather all paragraphs which aren't empty
  for (const para of paragraphs) {
    if (!contentEls.includes(para)) {
      contentEls.push(para);
    }
  }

  // Remove duplicate elements if any (precaution)
  const uniqueContentEls = Array.from(new Set(contentEls));

  // If no content, provide a blank cell for robustness
  const contentRow = [uniqueContentEls.length ? uniqueContentEls : ['']];

  // Build the block table
  const tableCells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}
