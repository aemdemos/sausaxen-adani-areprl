/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cardCols = element.querySelectorAll(':scope > div');
  cardCols.forEach(cardCol => {
    // Find the link (if present) and the card inside
    const cardLink = cardCol.querySelector('a');
    const card = cardLink ? cardLink.querySelector('.card') : cardCol.querySelector('.card');
    if (!card) return;

    // Extract image (first cell)
    let img = null;
    const imgWrap = card.querySelector('.b-o-director');
    if (imgWrap) {
      img = imgWrap.querySelector('img');
    }
    // If no image, leave null (could be handled for no-image variant)

    // Extract text (second cell)
    const body = card.querySelector('.card-body');
    const textContent = document.createElement('div');
    if (body) {
      const title = body.querySelector('.card-title');
      const desc = body.querySelector('.card-text');
      // Title: if link is present, wrap in <a>, else just strong
      if (title) {
        if (cardLink) {
          const a = document.createElement('a');
          a.href = cardLink.getAttribute('href');
          a.innerHTML = title.innerHTML;
          a.style.textDecoration = 'none';
          a.style.color = 'inherit';
          const strong = document.createElement('strong');
          strong.appendChild(a);
          textContent.appendChild(strong);
        } else {
          const strong = document.createElement('strong');
          strong.innerHTML = title.innerHTML;
          textContent.appendChild(strong);
        }
      }
      // Description: always below title
      if (desc) {
        // Add line break if title exists
        if (title) textContent.appendChild(document.createElement('br'));
        const descDiv = document.createElement('div');
        descDiv.innerHTML = desc.innerHTML;
        textContent.appendChild(descDiv);
      }
    }
    rows.push([img, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
