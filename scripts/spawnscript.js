import {Data2 } from '../dbs/fullspawn.js';

document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const locationSelect = document.getElementById('location');
    const raritySelect = document.getElementById('rarity');
    const typeSelect = document.getElementById('type');
    const pokemonSelect = document.getElementById('pokemon');
    const soloSelect = document.getElementById('solo');
    const evYieldSelect = document.getElementById('ev_yield');
    const dropsInput = document.getElementById('drops');
    const resultsDiv = document.getElementById('card-view');
    const tableDiv = document.getElementById('table-view');
    const applyFiltersButton = document.getElementById('apply-filters');
    const resetFiltersButton = document.getElementById('reset-filters');
    const toggleViewButton = document.getElementById('toggle-view');

    let isCardView = true;

    function populateSelectOptions() {
        const uniqueRegions = [...new Set(Data2.map(item => item.Region))];
        const uniqueLocations = [...new Set(Data2.map(item => item.Location))];
        const uniqueRarities = [...new Set(Data2.map(item => item.Rarity))];
        const uniqueTypes = [...new Set(Data2.map(item => item.Type))];
        const uniquePokemons = [...new Set(Data2.map(item => item.Pokemon))];
        const uniqueEVs = [...new Set(Data2.map(item => item.EV_Yield))];

        function addOptions(selectElement, options) {
            selectElement.innerHTML = '<option value="">Select</option>';
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                selectElement.appendChild(opt);
            });
        }

        addOptions(regionSelect, uniqueRegions);
        addOptions(locationSelect, uniqueLocations);
        addOptions(raritySelect, uniqueRarities);
        addOptions(typeSelect, uniqueTypes);
        addOptions(pokemonSelect, uniquePokemons);
        addOptions(evYieldSelect, uniqueEVs);
    }

    function filterData() {
        const region = regionSelect.value;
        const location = locationSelect.value;
        const rarity = raritySelect.value;
        const type = typeSelect.value;
        const pokemon = pokemonSelect.value;
        const solo = soloSelect.value;
        const evYield = evYieldSelect.value;
        const drops = dropsInput.value.toLowerCase();

        const filteredData = Data2.filter(item => {
            return (!region || item.Region === region) &&
                   (!location || item.Location === location) &&
                   (!rarity || item.Rarity === rarity) &&
                   (!type || item.Type === type) &&
                   (!pokemon || item.Pokemon === pokemon) &&
                   (!solo || item.Solo === solo) &&
                   (!evYield || item.EV_Yield === evYield) &&
                   (!drops || item.Drops.toLowerCase().includes(drops));
        });

        if (isCardView) {
            displayCardView(filteredData);
        } else {
            displayTableView(filteredData);
        }
    }

    function displayCardView(data) {
        resultsDiv.innerHTML = '';
        if (data.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
        } else {
            data.forEach(item => {
              const dropValue = ['Prize', 'Starter', 'Box', 'Fossil'].includes(item.Type) ? '' : item.Drops;
                const div = document.createElement('div');
                div.classList.add('result-item');
                div.innerHTML = `
                    <div class="text-content">
                        <div class="pokemon">${item.Pokemon}</div>
                        <div class="location">${item.Location}</div>
                        <p><strong>Region:</strong> ${item.Region}</p>
                        <p><strong>Rarity:</strong> ${item.Rarity}</p>
                        <p><strong>Type:</strong> ${item.Type}</p>
                        <p><strong>Solo:</strong> ${item.Solo}</p>
                        <p><strong>EV Yield:</strong> ${item.EV_Yield}</p>
                        <p><strong>Drops:</strong> ${dropValue}</p>
                    </div>
                    <div class="image-content">
                        <img src="${item.Poke_Img}" alt="${item.Pokemon}" class="poke-img">
                        <img src="${item.Loc_Img}" alt="Location image" class="location-img">
                    </div>
                `;
                resultsDiv.appendChild(div);
            });
            addImageClickListeners();
        }
    }

    function displayTableView(data) {
        tableDiv.innerHTML = '';
        if (data.length === 0) {
            tableDiv.innerHTML = '<p>No results found.</p>';
        } else {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Table Header
            thead.innerHTML = `
                <tr>
                    <th>Pokemon</th>
                    <th>Location</th>
                    <th>Region</th>
                    <th>Rarity</th>
                    <th>Type</th>
                    <th>Solo</th>
                    <th>EV Yield</th>
                    <th>Drops</th>
                </tr>
            `;
            table.appendChild(thead);

            // Table Body
            data.forEach(item => {
              const dropValue = ['Prize', 'Starter', 'Box', 'Fossil'].includes(item.Type) ? '' : item.Drops;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.Pokemon}</td>
                    <td>${item.Location}</td>
                    <td>${item.Region}</td>
                    <td>${item.Rarity}</td>
                    <td>${item.Type}</td>
                    <td>${item.Solo}</td>
                    <td>${item.EV_Yield}</td>
                   <td>${dropValue}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            tableDiv.appendChild(table);
        }
    }

    function addImageClickListeners() {
        document.querySelectorAll('.image-content img').forEach(img => {
            img.addEventListener('click', () => {
                img.classList.toggle('expanded');
            });
        });
    }

    function applyFilters() {
        filterData();
    }

    function resetFilters() {
        regionSelect.value = '';
        locationSelect.value = '';
        raritySelect.value = '';
        typeSelect.value = '';
        pokemonSelect.value = '';
        soloSelect.value = '';
        evYieldSelect.value = '';
        dropsInput.value = '';
        resultsDiv.innerHTML = '<p>Please apply filters to see results.</p>';
        tableDiv.innerHTML = '';
    }

    function toggleView() {
        isCardView = !isCardView;
        if (isCardView) {
            resultsDiv.style.display = 'flex';
            tableDiv.style.display = 'none';
            toggleViewButton.textContent = 'Switch to Table View';
        } else {
            resultsDiv.style.display = 'none';
            tableDiv.style.display = 'block';
            toggleViewButton.textContent = 'Switch to Card View';
        }
    }

    // Initialize dropdown options
    populateSelectOptions();

    // Event listeners
    applyFiltersButton.addEventListener('click', applyFilters);
    resetFiltersButton.addEventListener('click', resetFilters);
    toggleViewButton.addEventListener('click', toggleView);

    // Ensure results are empty initially
    resultsDiv.innerHTML = '<p>Please apply filters to see results.</p>';
    tableDiv.innerHTML = '<p>No results found.</p>'; // Ensure table view is empty initially
});