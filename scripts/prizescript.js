import {prizelist } from '../dbs/prizedata.js';

document.addEventListener("DOMContentLoaded", function() {

    const tableBody = document.querySelector("#costTable tbody");
    const masterFilter = document.getElementById("masterFilter");
    const prizelocFilter = document.getElementById("prizelocFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    // Populate table
    function populateTable(filteredData) {
        tableBody.innerHTML = "";
        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    // Initialize filters
    function initializeFilters() {
        const prizeloc = [...new Set(prizelist.map(row => row[2]))].sort();
        const categories = [...new Set(prizelist.map(row => row[1]))].sort();

        prizeloc.forEach(prizeloc => {
            const option = document.createElement("option");
            option.value = prizeloc;
            option.textContent = prizeloc;
            prizelocFilter.appendChild(option);
        });

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Filter function
    function filterTable() {
        const masterValue = masterFilter.value.toLowerCase();
        const prizelocValue = prizelocFilter.value.toLowerCase();
        const categoryValue = categoryFilter.value.toLowerCase();

        const filteredData = prizelist.filter(row => {
            return (row.join(" ").toLowerCase().includes(masterValue)) &&
                   (prizelocValue === "" || row[2].toLowerCase() === prizelocValue) &&
                   (categoryValue === "" || row[1].toLowerCase() === categoryValue);
        });

        populateTable(filteredData);
    }

    // Event listeners
    masterFilter.addEventListener("input", filterTable);
    prizelocFilter.addEventListener("change", filterTable);
    categoryFilter.addEventListener("change", filterTable);

    // Initialize table and filters
    populateTable(prizelist);
    initializeFilters();
});

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