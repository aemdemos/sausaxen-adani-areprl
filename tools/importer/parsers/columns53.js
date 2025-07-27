/* global WebImporter */
export default function parse(element, { document }) {
  // Get the column containers
  const columns = Array.from(element.children).filter(
    (el) => el.classList.contains('col-md-5') || el.classList.contains('col-md-7')
  );

  // Left cell: Video or fallback
  let leftCell = document.createTextNode('');
  if (columns[0]) {
    const imgContainer = columns[0].querySelector('.big--img') || columns[0];
    const video = imgContainer.querySelector('video');
    if (video) leftCell = video;
    else leftCell = imgContainer;
  }

  // Right cell: content-div and carousel-stage grouped together
  let rightCellContent = [];
  if (columns[1]) {
    // content-div (heading, stat, paragraph)
    const contentDiv = columns[1].querySelector('.content--div');
    if (contentDiv) rightCellContent.push(contentDiv);
    // carousel images
    const carouselDiv = columns[1].querySelector('.carousel--div');
    if (carouselDiv) {
      const stage = carouselDiv.querySelector('.bootstrape-stage');
      if (stage) rightCellContent.push(stage);
    }
  }
  if (rightCellContent.length === 0) rightCellContent = [document.createTextNode('')];

  // Block table: header row must be a single cell
  const cells = [
    ['Columns (columns53)'],
    [leftCell, rightCellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
