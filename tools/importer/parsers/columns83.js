/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per the requirements
  const headerRow = ['Columns (columns83)'];

  // Find all direct children
  const divs = Array.from(element.querySelectorAll(':scope > div'));
  const pNote = element.querySelector(':scope > p');

  // Get all .col-lg-6 and .col-lg-12 divs (in DOM order)
  const col6Divs = divs.filter(div => div.classList.contains('col-lg-6'));
  const col12Divs = divs.filter(div => div.classList.contains('col-lg-12'));

  // Extract images from .col-lg-6 divs
  const col6Imgs = col6Divs.map(div => div.querySelector('img')).filter(Boolean);

  // Extract image from .col-lg-12 div
  const col12Img = col12Divs.length > 0 ? col12Divs[0].querySelector('img') : null;

  // Compose the rows as in the markdown example
  // Only add non-empty rows
  const cells = [headerRow];

  // Second row: first 2 images
  if (col6Imgs.length >= 2) {
    cells.push([col6Imgs[0], col6Imgs[1]]);
  }

  // Third row: next 2 images
  if (col6Imgs.length >= 4) {
    cells.push([col6Imgs[2], col6Imgs[3]]);
  }

  // Fourth row: full-width image (col-lg-12) and note underneath
  if (col12Img) {
    // The first cell is the image, the second cell is the note, if present
    cells.push([
      col12Img,
      pNote ? pNote : ''
    ]);
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
