/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns
  const cols = element.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // LEFT COLUMN: video and summary
  const leftCol = cols[0];
  const videoBlock = leftCol.querySelector('.CatchImg');

  // RIGHT COLUMN: stack news cards
  const rightCol = cols[1];
  const newsRows = rightCol.querySelectorAll(':scope > .row.right--side--row');
  const newsListDiv = document.createElement('div');
  newsRows.forEach(row => {
    const img = row.querySelector('.image--part');
    const content = row.querySelector('.content--part');
    if (img || content) {
      const cardDiv = document.createElement('div');
      if (img) cardDiv.appendChild(img);
      if (content) cardDiv.appendChild(content);
      newsListDiv.appendChild(cardDiv);
    }
  });

  // === Fix: Create the table manually to set header colspan ===
  const table = document.createElement('table');

  // Header row (with colspan=2)
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns36)';
  th.colSpan = 2;
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Data row
  const trData = document.createElement('tr');
  const tdLeft = document.createElement('td');
  if (videoBlock) tdLeft.appendChild(videoBlock);
  const tdRight = document.createElement('td');
  tdRight.appendChild(newsListDiv);
  trData.appendChild(tdLeft);
  trData.appendChild(tdRight);
  table.appendChild(trData);

  element.replaceWith(table);
}
