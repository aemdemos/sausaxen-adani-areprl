/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct tab <li> children
  const tabItems = Array.from(element.querySelectorAll(':scope > li'));
  // Compose tab rows: [label, content] (content may be empty string)
  const tabRows = tabItems.map((li) => {
    const link = li.querySelector('a');
    if (!link) return null;
    const label = link.textContent.trim();
    // Look for associated tab pane by id if possible
    let content = '';
    const href = link.getAttribute('href');
    if (href && href[0] === '#') {
      const pane = document.getElementById(href.slice(1));
      if (pane) content = pane;
    }
    return [label, content];
  }).filter(Boolean);

  // Always use a single header cell as per the example
  const cells = [['Tabs'], ...tabRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
