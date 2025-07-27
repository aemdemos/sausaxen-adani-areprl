/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row exactly as needed
  const headerRow = ['Carousel (carousel74)'];

  // Find the carousel element
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;

  // Get all slide items having class .bootstrape-item in DOM order
  // Only count the first appearance of each unique slide by image src and text
  const slides = [];
  const seen = new Set();
  carousel.querySelectorAll('.bootstrape-item').forEach(item => {
    // Use both image src and text as a unique key to avoid missing visually identical but textually different slides
    const img = item.querySelector('img');
    let slideText = '';
    const textContainer = item.querySelector('.vertical-fourth');
    if (textContainer) slideText = textContainer.textContent.trim();
    const uniqueKey = (img ? img.getAttribute('src') : '') + '||' + slideText;
    if (!seen.has(uniqueKey)) {
      seen.add(uniqueKey);
      slides.push(item);
    }
  });

  // Compose table rows: each row is [image, text content]
  const rows = [headerRow];
  slides.forEach(item => {
    const img = item.querySelector('img');
    // Compose the text cell by collecting all direct children of the text container, preserving structure
    let textCell = '';
    const textContainer = item.querySelector('.vertical-fourth');
    if (textContainer) {
      const content = Array.from(textContainer.children);
      textCell = content.length ? content : '';
    }
    rows.push([img, textCell]);
  });

  // Replace given element with the new block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
