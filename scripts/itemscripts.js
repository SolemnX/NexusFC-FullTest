import {items } from '../dbs/item.js';
    

  const tableBody = document.querySelector('#itemsTable tbody');
  const itemsTable = document.getElementById('itemsTable');
  
  function renderTable(data) {
      tableBody.innerHTML = '';
      data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.Item}</td>
              <td>${item["How to Use"]}</td>
              <td>${item["How to Obtain"]}</td>
          `;
          tableBody.appendChild(row);
      });
  }
  
  function filterTable() {
      const masterFilter = document.getElementById('masterFilter').value.toLowerCase();
      const itemFilter = document.getElementById('itemFilter').value.toLowerCase();
      const useFilter = document.getElementById('useFilter').value.toLowerCase();
      const obtainFilter = document.getElementById('obtainFilter').value.toLowerCase();
  
      const filteredItems = items.filter(item => {
          return (
              (masterFilter === '' || Object.values(item).some(value => value.toLowerCase().includes(masterFilter))) &&
              (itemFilter === '' || item.Item.toLowerCase().includes(itemFilter)) &&
              (useFilter === '' || item["How to Use"].toLowerCase().includes(useFilter)) &&
              (obtainFilter === '' || item["How to Obtain"].toLowerCase().includes(obtainFilter))
          );
      });
  
      renderTable(filteredItems);
      itemsTable.classList.remove('hidden');
  }
  
  document.getElementById('applyFilters').addEventListener('click', filterTable);
  document.getElementById('resetFilters').addEventListener('click', () => {
      document.getElementById('masterFilter').value = '';
      document.getElementById('itemFilter').value = '';
      document.getElementById('useFilter').value = '';
      document.getElementById('obtainFilter').value = '';
      itemsTable.classList.add('hidden');
      renderTable(items);
  });
  
  // Initial render (table hidden initially)
  itemsTable.classList.add('hidden');

  // Event listeners
document.getElementById('itemFilter').addEventListener('change', updateTables);
document.getElementById('materialFilter').addEventListener('change', updateTables);

