import { pokemonData } from './pokemondata.js';

document.addEventListener('DOMContentLoaded', () => {
    const pokemonFilter = document.getElementById('pokemonFilter');
    const typeFilter1 = document.getElementById('typeFilter1');
    const typeFilter2 = document.getElementById('typeFilter2');
    const ability1Filter = document.getElementById('ability1Filter');
    const ability2Filter = document.getElementById('ability2Filter');
    const hiddenAbilityFilter = document.getElementById('hiddenAbilityFilter');
    const evYieldFilter = document.getElementById('evYieldFilter');
    const pokemonDataContainer = document.getElementById('pokemonDataContainer');
    const paginationControls = document.getElementById('paginationControls');

    const formsPerPage = 20;
    let currentPage = 1;
    let filteredData = [...pokemonData];

    function renderPokemonData(data) {
        pokemonDataContainer.innerHTML = '';
        const start = (currentPage - 1) * formsPerPage;
        const end = start + formsPerPage;
        const dataToShow = data.slice(start, end);

        dataToShow.forEach(pokemon => {
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `
                <div class="pokemon-sprites">
                    <img src="${pokemon.RegSprite}" alt="${pokemon.Pokemon} Regular Sprite" class="sprite-image">
                    <img src="${pokemon.ShinySprite}" alt="${pokemon.Pokemon} Shiny Sprite" class="sprite-image">
                </div>
                <div class="pokemon-info">
                    <h2>${pokemon.Pokemon} (${pokemon.Form})</h2>
                    <table>
                        <thead>
                            <tr><th>Type1</th><th>Type2</th><th>EV Yield</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${pokemon.Type1}</td>
                                <td>${pokemon.Type2}</td>
                                <td>${pokemon.EV_Yield}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr><th>Ability1</th><th>Ability2</th><th>HiddenAbility</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${pokemon.Ability1}</td>
                                <td>${pokemon.Ability2}</td>
                                <td>${pokemon.HiddenAbility}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr><th>HP</th><th>Attack</th><th>Defense</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${pokemon.HP_Base}</td>
                                <td>${pokemon.Attack_Base}</td>
                                <td>${pokemon.Defense_Base}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr><th>Special Attack</th><th>Special Defense</th><th>Speed</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${pokemon.Special_Attack_Base}</td>
                                <td>${pokemon.Special_Defense_Base}</td>
                                <td>${pokemon.Speed_Base}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            pokemonDataContainer.appendChild(card);
        });

        updatePaginationControls(data.length);
    }

    function updatePaginationControls(totalItems) {
        const totalPages = Math.ceil(totalItems / formsPerPage);
        document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage >= totalPages;

        prevButton.onclick = () => changePage(-1);
        nextButton.onclick = () => changePage(1);
    }

    function changePage(offset) {
        currentPage += offset;
        renderPokemonData(filteredData);
    }

    function goToPage(pageNumber) {
        currentPage = pageNumber;
        renderPokemonData(filteredData);
    }

    function filterPokemon() {
        const filterValue = pokemonFilter.value.toLowerCase();
        const type1Filter = typeFilter1.value.toLowerCase();
        const type2Filter = typeFilter2.value.toLowerCase();
        const ability1FilterValue = ability1Filter.value.toLowerCase();
        const ability2FilterValue = ability2Filter.value.toLowerCase();
        const hiddenAbilityFilterValue = hiddenAbilityFilter.value.toLowerCase();
        const evYieldFilterValue = evYieldFilter.value.toLowerCase();

        filteredData = pokemonData.filter(pokemon => {
            const matchesPokemon = pokemon.Pokemon.toLowerCase().includes(filterValue);
            const matchesType1 = type1Filter === '' || 
                pokemon.Type1.toLowerCase().includes(type1Filter) || 
                pokemon.Type2.toLowerCase().includes(type1Filter);
            const matchesType2 = type2Filter === '' || 
                pokemon.Type1.toLowerCase().includes(type2Filter) || 
                pokemon.Type2.toLowerCase().includes(type2Filter);
            const matchesAbilityFilters = 
                (ability1FilterValue === '' || pokemon.Ability1.toLowerCase().includes(ability1FilterValue)) &&
                (ability2FilterValue === '' || pokemon.Ability2.toLowerCase().includes(ability2FilterValue)) &&
                (hiddenAbilityFilterValue === '' || pokemon.HiddenAbility.toLowerCase().includes(hiddenAbilityFilterValue));
            const matchesEvYield = evYieldFilterValue === '' || pokemon.EV_Yield.toLowerCase().includes(evYieldFilterValue);

            return matchesPokemon && matchesType1 && matchesType2 && matchesAbilityFilters && matchesEvYield;
        });

        currentPage = 1; // Reset to the first page
        renderPokemonData(filteredData);
    }

    function preventFormSubmit(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    pokemonFilter.addEventListener('input', filterPokemon);
    pokemonFilter.addEventListener('keydown', preventFormSubmit);
    typeFilter1.addEventListener('input', filterPokemon);
    typeFilter1.addEventListener('keydown', preventFormSubmit);
    typeFilter2.addEventListener('input', filterPokemon);
    typeFilter2.addEventListener('keydown', preventFormSubmit);
    ability1Filter.addEventListener('input', filterPokemon);
    ability1Filter.addEventListener('keydown', preventFormSubmit);
    ability2Filter.addEventListener('input', filterPokemon);
    ability2Filter.addEventListener('keydown', preventFormSubmit);
    hiddenAbilityFilter.addEventListener('input', filterPokemon);
    hiddenAbilityFilter.addEventListener('keydown', preventFormSubmit);
    evYieldFilter.addEventListener('input', filterPokemon);
    evYieldFilter.addEventListener('keydown', preventFormSubmit);

    renderPokemonData(pokemonData);
});

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