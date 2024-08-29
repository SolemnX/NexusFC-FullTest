
import {Data2 } from '../dbs/fullspawn.js';
import {data } from '../dbs/evlocations.js';
import {drops } from '../dbs/dropslocations.js';

const rarityLevels = ['*Common', '*Uncommon', '*Rare', '*Very Rare', '*Extremely Rare', '*Legendary'];
const types = ['Land', 'Fishing', 'Surfing'];

const locationInput = document.getElementById('location-search');
const locationsList = document.getElementById('locations-list');
const tablesContainer = document.getElementById('tables-container');
const pokemonListContainer = document.getElementById('pokemon-list-container');
const locationImage = document.getElementById('location-image');
const locationName = document.getElementById('location-name');

// Populate datalist with unique locations
const locations = [...new Set(data.map(item => item.Location))];
locations.forEach(location => {
    const option = document.createElement('option');
    option.value = location;
    option.textContent = location;
    locationsList.appendChild(option);
});

// Function to get image URL for a given location
function getLocationImage(location) {
    const locationData = Data2.find(item => item.Location === location);
    return locationData ? locationData.Loc_Img : ''; // Return image URL or empty string if not found
}

// Function to generate table rows for all rarities and stats
function generateTableRows() {
    return rarityLevels.map(rarity => `
        <tr>
            <td>${rarity} EV Guide</td>
            <td class="hp"></td>
            <td class="attack"></td>
            <td class="defense"></td>
            <td class="spatk"></td>
            <td class="spdef"></td>
            <td class="speed"></td>
        </tr>
    `).join('');
}

// Function to initialize tables with all possible rows
function initializeTables() {
    types.forEach(type => {
        const tableBody = document.querySelector(`#${type.toLowerCase()}-table tbody`);
        if (tableBody) {
            tableBody.innerHTML = generateTableRows();
            console.log(`Initialized ${type} table.`);
        } else {
            console.warn(`Table body for type "${type}" not found.`);
        }
    });
}

// Function to filter data based on location and type
function filterData(location, type) {
    return data.filter(item => item.Location === location && item.Type === type);
}

// Function to update tables based on location
function updateTables(location) {
  types.forEach(type => {
      const tableBody = document.querySelector(`#${type.toLowerCase()}-table tbody`);
      if (!tableBody) {
          console.warn(`Table body for type "${type}" not found.`);
          return;
      }

      const entries = filterData(location, type);
      console.log(`Updating table for ${type}. Entries:`, entries);

      tableBody.querySelectorAll('tr').forEach(row => {
          const rarityCell = row.cells[0];
          const rarityText = rarityCell.textContent.trim();
          const rarity = rarityText.replace(' EV Guide', ''); // Adjust for matching
          console.log(`Updating row for rarity "${rarityText}". Normalized rarity: "${rarity}"`);

          const entry = entries.find(e => e.Rarity === rarity) || {};
          console.log(`Entry:`, entry);

          row.querySelectorAll('td').forEach((cell, index) => {
              if (index > 0) { // Skip the rarity cell
                  const stat = ['HP', 'Attack', 'Defense', 'SpAtk', 'SpDef', 'Speed'][index - 1];
                  const value = entry[stat] !== undefined ? entry[stat] : 0;
                  cell.textContent = value;

                  // Add inline styles for consistent size
                  cell.style.width = '100px';  // Set a consistent width
                  cell.style.height = '50px';  // Set a consistent height
                  cell.style.textAlign = 'center'; // Center text
                  cell.style.border = '1px solid #ddd'; // Border color

                  // Conditional styling based on value
                  cell.className = value === 0 ? 'red' : 'green';
              }
          });
      });
  });
}
// Function to filter drops based on location
function filterDrops(location) {
    return drops.filter(item => item.Location === location);
}

// Function to generate HTML for drops
function generateDropsHTML(drops) {
    const dropsByType = drops.reduce((acc, drop) => {
        if (!acc[drop.Type]) {
            acc[drop.Type] = new Set();
        }
        acc[drop.Type].add(drop.Drops); // Use Set to keep unique drops
        return acc;
    }, {});

    let html = '';
    for (const [type, dropsSet] of Object.entries(dropsByType)) {
        html += `
        <div>
            <table>
                <thead>
                    <tr>
                        <th>${type} Drops</th>
                    </tr>
                </thead>
                <tbody>
        `;

        [...dropsSet].forEach(dropItem => {
            html += `
            <tr>
                <td>${dropItem}</td>
            </tr>
            `;
        });

        html += `</tbody></table></div>`;
    }

    return html;
}

// Function to update drops table
function updateDropsTable(location) {
    console.log('Updating drops table for location:', location);
    const filteredDrops = filterDrops(location);
    console.log('Filtered drops:', filteredDrops);
    const dropsHTML = generateDropsHTML(filteredDrops);
    console.log('Generated drops HTML:', dropsHTML);

    const dropsTableContainer = document.getElementById('drops-table-container');
    if (dropsTableContainer) {
        dropsTableContainer.innerHTML = dropsHTML;
    } else {
        console.error('Element with ID "drops-table-container" not found.');
    }
}

// Function to organize Pokémon data for display
function organizePokemonData(data, location) {
    const organized = {};
    
    types.forEach(type => {
        organized[type] = rarityLevels.reduce((acc, rarity) => {
            acc[rarity] = [];
            return acc;
        }, {});
    });

    const filteredData = data.filter(pokemon => 
        location === 'All' || pokemon.Location === location
    );

    filteredData.forEach(pokemon => {
        if (organized[pokemon.Type] && organized[pokemon.Type][pokemon.Rarity]) {
            organized[pokemon.Type][pokemon.Rarity].push(pokemon);
        }
    });

    return organized;
}

// Function to generate HTML for Pokémon display
function generatePokemonHTML(organizedData) {
    let html = '';

    types.forEach(type => {
        html += `
            <div class="pokemon-table-container ${type.toLowerCase()}-table-container">
                <h3>${type} Encounters</h3>
                <table id="${type.toLowerCase()}-pokemon-table">
                    <thead>
                        <tr>
                            <th>Pokemon</th>
                            <th>Image</th>
                            <th>Possible Drop</th>
                        </tr>
                    </thead>
                    <tbody>`;

        rarityLevels.forEach(rarity => {
            organizedData[type][rarity].forEach(pokemon => {
                const dropsList = pokemon.Drops.split(',').map(drop => `<li>${drop.trim()}</li>`).join('');
                html += `
                    <tr>
                        <td>
                            <p class="lilheaders">Pokemon Name</p>
                            <p>${pokemon.Pokemon}</p>
                            <p class="lilheaders">Rarity</p>
                            <p>${rarity}</p>
                            <p class="lilheaders">EV Yield</p>
                            <p>${pokemon.EV_Yield}</p>
                        </td>
                        <td><img src="${pokemon.Poke_Img}" alt="${pokemon.Pokemon}" width="200"></td>
                        <td>
                            <ul class="drops-list">
                                ${dropsList}
                            </ul>
                        </td>
                    </tr>
                `;
            });
        });

        html += `</tbody></table></div>`;
    });

    return html;
}

// Function to update Pokémon display
function updatePokemonDisplay() {
    const selectedLocation = locationInput.value;
    const organizedData = organizePokemonData(Data2, selectedLocation);
    const pokemonHTML = generatePokemonHTML(organizedData);

    if (pokemonListContainer) {
        pokemonListContainer.innerHTML = pokemonHTML;
    } else {
        console.error('Element with ID "pokemon-list-container" not found.');
    }
}

// Function to update the location image based on selected location
function updateLocationImage(location) {
    const imageURL = getLocationImage(location);
    if (locationImage && locationName) {
        locationImage.src = imageURL || '';
        locationImage.alt = imageURL ? `Image of ${location}` : 'No image available';
        locationName.textContent = location; // Set the location name
    } else {
        console.error('Element with ID "location-image" or "location-name" not found.');
    }
}

// Event listener for location input change
locationInput.addEventListener('input', () => {
    const location = locationInput.value;
    if (location) {
        updateTables(location);
        updatePokemonDisplay();
        updateLocationImage(location);
        updateDropsTable(location);
    } else {
        // Reset table data without clearing structure
        initializeTables(); // Re-initialize tables to default state
        pokemonListContainer.innerHTML = '<p>No Pokémon available for this location.</p>';
        updateLocationImage(''); // Clear location image if input is empty
        updateDropsTable(''); // Clear drops table if input is empty
    }
});

// Initialize tables and Pokémon display on page load
initializeTables();
updatePokemonDisplay();

