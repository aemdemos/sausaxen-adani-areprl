/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate container, which holds the block content
  const container = element.querySelector('.container');
  if (!container) return;

  // HEADER ROW: block name
  const headerRow = ['Hero (hero63)'];

  // ROW 2: Background image placeholder (none in this HTML)
  const bgImageRow = [''];

  // ROW 3: Content (heading, description, CTA)
  const contentRowElements = [];

  // 1. Heading (h1)
  const heading = container.querySelector('h1');
  if (heading) contentRowElements.push(heading);

  // 2. Description paragraph (the largest one)
  //    The mb-5 is used for the main description paragraph
  const desc = container.querySelector('p.mb-5');
  // Avoid adding a CTA link as description
  if (desc && !desc.querySelector('a')) {
    contentRowElements.push(desc);
  }

  // 3. CTA (if present)
  //    Try to get both strong text and CTA link from the d-lg-none paragraphs
  const ctaStrong = container.querySelector('p.d-lg-none strong');
  if (ctaStrong) {
    // Reference the parent <p> for context (since it may contain the strong)
    const strongParent = ctaStrong.closest('p');
    if (strongParent && !contentRowElements.includes(strongParent)) contentRowElements.push(strongParent);
  }

  const ctaLink = container.querySelector('p.d-lg-none a');
  if (ctaLink) {
    // Reference the parent <p> for context (the button link cell)
    const linkParent = ctaLink.closest('p');
    if (linkParent && !contentRowElements.includes(linkParent)) contentRowElements.push(linkParent);
  }

  // Compose the rows for the table
  const rows = [
    headerRow,
    bgImageRow,
    [contentRowElements]
  ];

  // Create the block table using existing elements
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}
