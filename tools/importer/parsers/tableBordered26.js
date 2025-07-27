/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first table inside the element
  const table = element.querySelector('table');

  // The block header must be exactly 'Table (bordered)' as per guidelines
  const headerRow = ['Table (bordered)'];

  // Only the table content (not the currency annotation) should be used as the block content
  // The 'rupee' div is a floating annotation, not semantically part of the table
  const rows = [headerRow, [table]];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
