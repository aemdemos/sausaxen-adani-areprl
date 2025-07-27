/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: make img src absolute
  function absolutizeImgSrc(img) {
    if (img && img.getAttribute('src')) {
      const a = document.createElement('a');
      a.href = img.getAttribute('src');
      img.src = a.href;
    }
    return img;
  }

  // Find all carousels on the page
  const carousels = element.querySelectorAll('.bootstrape-carousel.capabilities_carousel');
  const rows = [];
  // Exact header as in example
  rows.push(['Carousel (carousel49)']);

  carousels.forEach((carousel) => {
    // Find the carousel slides container
    const stage = carousel.querySelector('.bootstrape-stage');
    if (!stage) return;
    // Find all bootstrape-item elements that are direct children (capture both normal and cloned if needed)
    let items = Array.from(stage.children).filter(item => item.classList.contains('bootstrape-item'));
    // Filter out duplicated slides (clones) if both real and clones present
    const realItems = items.filter(item => !item.classList.contains('cloned'));
    if (realItems.length > 0) items = realItems;

    items.forEach(item => {
      // Each slide is structured as .item
      const slide = item.querySelector('.item');
      if (!slide) return;
      // ---- IMAGE ----
      // Try to find the first <img> in the slide
      const img = slide.querySelector('img');
      const imgCell = img ? absolutizeImgSrc(img) : '';
      // ---- TEXT ----
      // Prefer .capabilities_carousel_content, else take all content not in image column
      let textCell = '';
      const contentCol = slide.querySelector('.capabilities_carousel_content');
      if (contentCol) {
        // Gather all children of contentCol, recursively flattening any .capabilities_carousel_content--scroll children
        const collect = [];
        Array.from(contentCol.children).forEach(child => {
          if (
            child.classList &&
            child.classList.contains('capabilities_carousel_content--scroll')
          ) {
            Array.from(child.children).forEach(grand => collect.push(grand));
          } else {
            collect.push(child);
          }
        });
        if (collect.length) textCell = collect;
      } else {
        // If not found, use all elements except the image column
        const textCol = slide.querySelector('.row.no-gutters > div:not(.col-lg-5)');
        if (textCol) {
          let fallbackChildren = [];
          Array.from(textCol.children).forEach(node => fallbackChildren.push(node));
          if (fallbackChildren.length) textCell = fallbackChildren;
        }
      }
      // Only insert row if there is at least an image (per component description)
      if (imgCell) {
        rows.push([imgCell, textCell]);
      }
    });
  });

  // Only replace if there is at least header + 1 row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
