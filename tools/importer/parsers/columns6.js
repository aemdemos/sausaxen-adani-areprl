/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child with a class
  function getDirectChildByClass(parent, cls) {
    return Array.from(parent.children).find(el => el.classList.contains(cls));
  }

  // LEFT COLUMN: Stats/Icons + Text (col-lg-4)
  const leftCol = getDirectChildByClass(element, 'col-lg-4');
  let leftCellContent = [];
  if (leftCol) {
    // All immediate .stats blocks under .col-lg-4 > .row > .col-lg-12.stats
    const statsBlocks = leftCol.querySelectorAll(':scope > .row > .col-lg-12.stats');
    statsBlocks.forEach(stats => {
      // For each stats block, collect icon and text as a fragment
      const frag = document.createElement('div');
      // Icon
      const icon = stats.querySelector('.stats-icon img');
      if (icon) frag.appendChild(icon);
      // Text (span inside p)
      const countText = stats.querySelector('p');
      if (countText && countText.textContent.trim()) {
        // Use the <p> as-is for semantic meaning
        frag.appendChild(countText);
      }
      leftCellContent.push(frag);
    });
    // If all stats are empty, fall back to empty
    if (leftCellContent.length === 0) leftCellContent = [''];
  } else {
    leftCellContent = [''];
  }

  // RIGHT COLUMN: Video image + link (col-lg-8)
  const rightCol = getDirectChildByClass(element, 'col-lg-8');
  let rightCellContent = [];
  if (rightCol) {
    // Poster image
    const videoSection = rightCol.querySelector(':scope > .video-section');
    if (videoSection) {
      // Reference the actual element to bring image in
      rightCellContent.push(videoSection);
    }
    // Video link from iframe in modal
    const videoModal = rightCol.querySelector(':scope > .modal.video');
    if (videoModal) {
      const iframe = videoModal.querySelector('iframe');
      if (iframe && iframe.src) {
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = iframe.src;
        link.target = '_blank';
        rightCellContent.push(link);
      }
    }
    // If nothing found, fallback to empty
    if (rightCellContent.length === 0) rightCellContent = [''];
  } else {
    rightCellContent = [''];
  }

  // BUILD the block table: header row, then 1 content row, 2 columns
  const cells = [
    ['Columns (columns6)'],
    [leftCellContent, rightCellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
