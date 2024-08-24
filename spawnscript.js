import { pokemonData } from './spawn.js';

const rowsPerPage = 200;
let currentPage = 1;

document.getElementById('masterFilter').addEventListener('input', filterTable);
document.getElementById('regionFilter').addEventListener('input', filterTable);
document.getElementById('locationFilter').addEventListener('input', filterTable);
document.getElementById('rarityFilter').addEventListener('input', filterTable);
document.getElementById('typeFilter').addEventListener('input', filterTable);
document.getElementById('pokemonFilter').addEventListener('input', filterTable);
document.getElementById('soloFilter').addEventListener('input', filterTable);

function filterTable() {
    const masterFilterValue = document.getElementById('masterFilter').value.toUpperCase();
    const filterValues = [
        document.getElementById('regionFilter').value.toUpperCase(),
        document.getElementById('locationFilter').value.toUpperCase(),
        document.getElementById('rarityFilter').value.toUpperCase(),
        document.getElementById('typeFilter').value.toUpperCase(),
        document.getElementById('pokemonFilter').value.toUpperCase(),
        document.getElementById('soloFilter').value.toUpperCase()
    ];

    const filteredData = pokemonData.filter(row => {
        const matchesMasterFilter = masterFilterValue === '' || row.join(' ').toUpperCase().includes(masterFilterValue);
        const matchesIndividualFilters = filterValues.every((filter, index) => filter === '' || row[index].toUpperCase().includes(filter));
        return matchesMasterFilter && matchesIndividualFilters;
    });

    renderTable(filteredData);
}

function renderTable(data) {
    const tableBody = document.querySelector('#pokemonTable tbody');
    tableBody.innerHTML = ''; // Clear previous results

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach(row => {
        const rowElement = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement('td');
            cellElement.textContent = cell;
            rowElement.appendChild(cellElement);
        });
        tableBody.appendChild(rowElement);
    });

    updatePaginationControls(data.length);
}

function updatePaginationControls(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;
}

function changePage(delta) {
    currentPage += delta;
    filterTable();
}

// Bind changePage to the window object to make it globally accessible
window.changePage = changePage;

function sortTable(columnIndex) {
    const tableBody = document.querySelector('#pokemonTable tbody');
    const rows = Array.from(tableBody.rows);
    const direction = tableBody.getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.toLowerCase();
        const bText = b.cells[columnIndex].textContent.toLowerCase();
        return direction === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });

    rows.forEach(row => tableBody.appendChild(row));
    tableBody.setAttribute('data-sort-direction', direction);
}

// Initial render
filterTable();





//Do not modify below this thanks!

document.addEventListener('DOMContentLoaded', () => {
    const ratesButton = document.getElementById('rates-button');
    const spawnButton = document.getElementById('spawn-button');
    const pokeButton = document.getElementById('poke-button');
    const mineButton = document.getElementById('mine-button');
    const backButton = document.getElementById('back-button');
  
    if (ratesButton) {
        ratesButton.addEventListener('click', () => {
            window.location.href = 'rates.html';
        });
    }
  
    if (spawnButton) {
      spawnButton.addEventListener('click', () => {
          window.location.href = 'spawn.html';
      });
  }
  
  if (pokeButton) {
    pokeButton.addEventListener('click', () => {
        window.location.href = 'pokedata.html';
    });
  }
  if (mineButton) {
      mineButton.addEventListener('click', () => {
          window.location.href = 'miningindex.html';
      });
    }
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
  });