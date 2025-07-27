/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left column: col-lg-6
  const col6 = element.querySelector('.col-lg-6');
  let leftColContent = [];
  if (col6) {
    // Collect all child nodes (including text and elements)
    leftColContent = Array.from(col6.childNodes).filter(node => {
      // Filter out empty text nodes
      return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
    });
  }

  // Get the right column: .map-descriptions
  const descCol = element.querySelector('.map-descriptions');
  let rightColContent = [];
  if (descCol) {
    // Collect all child nodes (including text and elements)
    rightColContent = Array.from(descCol.childNodes).filter(node => {
      return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
    });
  }

  // Fallback to empty strings if columns empty
  if (!leftColContent.length) leftColContent = [''];
  if (!rightColContent.length) rightColContent = [''];

  // Compose the block table
  const cells = [
    ['Columns (columns34)'],
    [leftColContent, rightColContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
