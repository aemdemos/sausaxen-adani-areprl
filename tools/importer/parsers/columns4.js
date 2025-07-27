/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row containing columns
  const row = element.querySelector('.row.wind-row-data');
  if (!row) return;

  // Get the direct children of the row (columns)
  const columns = Array.from(row.children);
  if (columns.length < 2) return;

  // First column (left): content and carousel
  const firstCol = columns[0];
  // Second column (right): contains image/video
  const secondCol = columns[1];

  // Get the main content part from the first column
  const contentDiv = firstCol.querySelector('.content--div');
  // Get the carousel part from the first column
  const carouselDiv = firstCol.querySelector('.carousel--div');

  // Compose the first column content - preserve order, avoid missing content
  const firstColContent = [];
  if (contentDiv) firstColContent.push(contentDiv);
  if (carouselDiv) firstColContent.push(carouselDiv);

  // Second column: only the main image or video
  const secondColContent = [];
  // Try to get the .big--img element (may contain video or image)
  const bigImgContainer = secondCol.querySelector('.big--img');
  if (bigImgContainer) {
    // If there's a video, represent as a link per instructions
    const video = bigImgContainer.querySelector('video');
    if (video && video.src) {
      const a = document.createElement('a');
      a.href = video.src;
      a.textContent = video.src;
      secondColContent.push(a);
    } else {
      // If there's an image, keep the image as is
      const img = bigImgContainer.querySelector('img');
      if (img) secondColContent.push(img);
    }
  }

  // Compose the table: single header row (one column), then content row (multiple columns)
  const cells = [
    ['Columns (columns4)'], // Correct header: single cell, not matching the number of columns below
    [firstColContent, secondColContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
