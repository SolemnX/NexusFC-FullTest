
import {craft } from '../dbs/craft.js';

  function filterData() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const itemFilterValue = document.getElementById('itemFilter').value;
    const materialFilterValue = document.getElementById('materialFilter').value;
    
    return craft.filter(entry => {
        return (entry.Item.toLowerCase().includes(searchValue) ||
                entry.Material.toLowerCase().includes(searchValue)) &&
               (itemFilterValue === '' || entry.Item === itemFilterValue) &&
               (materialFilterValue === '' || entry.Material === materialFilterValue);
    });
}

function createTables(data) {
    const container = document.getElementById('tables-container');
    container.innerHTML = '';

    // Group data by Item and Recipe
    const groupedData = data.reduce((acc, entry) => {
        const key = `${entry.Item} - Recipe ${entry.Recipe}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(entry);
        return acc;
    }, {});

    // Create content for each group
    for (const [header, entries] of Object.entries(groupedData)) {
        // Create a wrapper for the left and right columns
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        // Create the left box
        const leftBox = document.createElement('div');
        leftBox.classList.add('left-box');
        leftBox.innerHTML = `
            <strong>${header}</strong>
            <div class="details-item"><strong>Item:</strong> ${entries[0]["Item"]}</div>
            <div class="details-item"><strong>Amount Crafted:</strong> ${entries[0]["Amount Crafted"]}</div>
            <div class="details-item"><strong>Item Use:</strong> ${entries[0]["Item Use"]}</div>
        `;
        wrapper.appendChild(leftBox);

        // Create the right column
        const rightColumn = document.createElement('div');
        rightColumn.classList.add('right-column');
        rightColumn.innerHTML = `
            <strong>Material Details</strong>
            <table>
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Amount</th>
                        <th>How to Obtain</th>
                    </tr>
                </thead>
                <tbody>
                    ${entries.map(entry => `
                        <tr>
                            <td>${entry.Material}</td>
                            <td>${entry["Amount Needed"]}</td>
                            <td>${entry["How to Obtain"]}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        wrapper.appendChild(rightColumn);

        // Append the wrapper to the container
        container.appendChild(wrapper);
    }
}

function updateTables() {
    const filteredData = filterData();
    createTables(filteredData);
}

function populateFilters() {
    const itemFilter = document.getElementById('itemFilter');
    const materialFilter = document.getElementById('materialFilter');

    // Extract unique values
    const uniqueItems = [...new Set(craft.map(entry => entry.Item))];
    const uniqueMaterials = [...new Set(craft.map(entry => entry.Material))];

    // Populate Item Filter
    itemFilter.innerHTML = '<option value="">Select Item</option>' +
        uniqueItems.map(item => `<option value="${item}">${item}</option>`).join('');

    // Populate Material Filter
    materialFilter.innerHTML = '<option value="">Select Material</option>' +
        uniqueMaterials.map(material => `<option value="${material}">${material}</option>`).join('');
}

// Initialize filters and tables
populateFilters();
updateTables();

// Event listeners
document.getElementById('search').addEventListener('input', updateTables);
document.getElementById('itemFilter').addEventListener('change', updateTables);
document.getElementById('materialFilter').addEventListener('change', updateTables);

document.addEventListener('DOMContentLoaded', () => {
  const itemButton = document.getElementById('item-button');
  const craftButton = document.getElementById('craft-button');
  const prizeButton = document.getElementById('prize-button');


  if (itemButton) {
      itemButton.addEventListener('click', () => {
          window.location.href = 'item.html';
      });
  }

  if (craftButton) {
    craftButton.addEventListener('click', () => {
        window.location.href = 'craft.html';
    });
}

if (prizeButton) {
  prizeButton.addEventListener('click', () => {
      window.location.href = 'prize.html';
  });
}

});