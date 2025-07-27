/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row that contains the columns
  const row = element.querySelector('.container > .row');
  if (!row) return;
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Column 1: Heading + Paragraphs
  const col1 = columns[0];
  const col1Content = [];
  // Add Heading
  const heading = col1.querySelector('h2');
  if (heading) col1Content.push(heading);
  // Add all paragraphs
  col1.querySelectorAll('p').forEach(p => {
    // Only add non-empty paragraphs
    if (p.textContent.trim()) col1Content.push(p);
  });

  // Column 2: Image + Title + Link
  const col2 = columns[1];
  // There may be a .p-3 wrapper inside col2
  const col2ContentWrapper = col2.querySelector('.p-3') || col2;
  const col2Content = [];
  // Add image if present
  const img = col2ContentWrapper.querySelector('img');
  if (img) col2Content.push(img);
  // Add the title below the image
  const susTitle = col2ContentWrapper.querySelector('.sus-r-title');
  if (susTitle && susTitle.textContent.trim()) col2Content.push(susTitle);
  // Add the "Explore More" link paragraph if present
  const linkPara = Array.from(col2ContentWrapper.querySelectorAll('p')).find(p => p.querySelector('a'));
  if (linkPara) col2Content.push(linkPara);

  // Table header as per requirements
  const headerRow = ['Columns (columns57)'];
  // Build the table rows
  const cells = [
    headerRow,
    [col1Content, col2Content]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
