import {data } from '../dbs/evlocations.js';

document.addEventListener('DOMContentLoaded', () => {
    const regionFilter = document.getElementById('region-filter');
    const rarityFilter = document.getElementById('rarity-filter');
    const typeFilter = document.getElementById('type-filter');
    const locationFilter = document.getElementById('location-filter');
    
    const hpValue = document.getElementById('hp-value');
    const hpComparison = document.getElementById('hp-comparison');
    const attackValue = document.getElementById('attack-value');
    const attackComparison = document.getElementById('attack-comparison');
    const defenseValue = document.getElementById('defense-value');
    const defenseComparison = document.getElementById('defense-comparison');
    const spatkValue = document.getElementById('spatk-value');
    const spatkComparison = document.getElementById('spatk-comparison');
    const spdefValue = document.getElementById('spdef-value');
    const spdefComparison = document.getElementById('spdef-comparison');
    const speedValue = document.getElementById('speed-value');
    const speedComparison = document.getElementById('speed-comparison');

    const resultsTableBody = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    const aggregatedResultsBody = document.getElementById('aggregated-results-table').getElementsByTagName('tbody')[0];
    const filteredResultsContainer = document.getElementById('filtered-results-container');
    const aggregatedResultsContainer = document.getElementById('aggregated-results-container');

    const uniqueRegions = [...new Set(data.map(item => item.Region))];
    const uniqueRarities = [...new Set(data.map(item => item.Rarity))];
    const uniqueTypes = [...new Set(data.map(item => item.Type))];
    const uniqueLocations = [...new Set(data.map(item => item.Location))];

    const createCheckboxGroup = (id, values) => {
        const container = document.getElementById(id);
        container.innerHTML = '';
        values.forEach(value => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = value;
            checkbox.classList.add(`${id}-checkbox`);
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(value));
            container.appendChild(label);
        });
    };

    const parseFilter = (value, comparison) => ({
        value: value ? parseFloat(value) : null,
        comparison: comparison
    });

    const applyNumericFilter = (itemValue, filter) => {
        if (filter.value === null) return true;
        switch (filter.comparison) {
            case 'lt': return itemValue < filter.value;
            case 'gt': return itemValue > filter.value;
            case 'eq': return itemValue === filter.value;
            default: return true;
        }
    };

    const filterData = () => {
        const selectedRegions = Array.from(document.querySelectorAll('#region-filter input:checked')).map(cb => cb.value);
        const selectedRarities = Array.from(document.querySelectorAll('#rarity-filter input:checked')).map(cb => cb.value);
        const selectedTypes = Array.from(document.querySelectorAll('#type-filter input:checked')).map(cb => cb.value);
        const searchLocation = locationFilter.value.toLowerCase();

        const hpFilter = parseFilter(hpValue.value, hpComparison.value);
        const attackFilter = parseFilter(attackValue.value, attackComparison.value);
        const defenseFilter = parseFilter(defenseValue.value, defenseComparison.value);
        const spatkFilter = parseFilter(spatkValue.value, spatkComparison.value);
        const spdefFilter = parseFilter(spdefValue.value, spdefComparison.value);
        const speedFilter = parseFilter(speedValue.value, speedComparison.value);

        const filteredData = data.filter(item =>
            (selectedRegions.length === 0 || selectedRegions.includes(item.Region)) &&
            (selectedRarities.length === 0 || selectedRarities.includes(item.Rarity)) &&
            (selectedTypes.length === 0 || selectedTypes.includes(item.Type)) &&
            (searchLocation === '' || item.Location.toLowerCase().includes(searchLocation)) &&
            applyNumericFilter(item.HP, hpFilter) &&
            applyNumericFilter(item.Attack, attackFilter) &&
            applyNumericFilter(item.Defense, defenseFilter) &&
            applyNumericFilter(item.SpAtk, spatkFilter) &&
            applyNumericFilter(item.SpDef, spdefFilter) &&
            applyNumericFilter(item.Speed, speedFilter)
        );

        updateTable(filteredData);
        updateAggregatedTable(filteredData);
    };

    const updateTable = (filteredData) => {
        resultsTableBody.innerHTML = '';
        filteredData.forEach(item => {
            const row = resultsTableBody.insertRow();
            Object.values(item).forEach(text => {
                const cell = row.insertCell();
                cell.textContent = text;
            });
        });
    };

    const updateAggregatedTable = (filteredData) => {
        aggregatedResultsBody.innerHTML = '';
        const aggregatedData = aggregateData(filteredData);
        
        aggregatedData.forEach(item => {
            const row = aggregatedResultsBody.insertRow();
            row.insertCell().textContent = item.Region;
            row.insertCell().textContent = item.Location;
            row.insertCell().textContent = item.Type;
            row.insertCell().textContent = item.HP;
            row.insertCell().textContent = item.Attack;
            row.insertCell().textContent = item.Defense;
            row.insertCell().textContent = item.SpAtk;
            row.insertCell().textContent = item.SpDef;
            row.insertCell().textContent = item.Speed;
        });
    };

    const aggregateData = (filteredData) => {
        const aggregation = {};
        
        filteredData.forEach(item => {
            const key = `${item.Region}|${item.Location}|${item.Type}`;
            if (!aggregation[key]) {
                aggregation[key] = { ...item };
                aggregation[key].HP = 0;
                aggregation[key].Attack = 0;
                aggregation[key].Defense = 0;
                aggregation[key].SpAtk = 0;
                aggregation[key].SpDef = 0;
                aggregation[key].Speed = 0;
            }

            aggregation[key].HP += item.HP;
            aggregation[key].Attack += item.Attack;
            aggregation[key].Defense += item.Defense;
            aggregation[key].SpAtk += item.SpAtk;
            aggregation[key].SpDef += item.SpDef;
            aggregation[key].Speed += item.Speed;
        });

        return Object.values(aggregation);
    };

    const showFilteredResults = () => {
        filteredResultsContainer.style.display = 'block';
        aggregatedResultsContainer.style.display = 'none';
    };

    const showAggregatedResults = () => {
        filteredResultsContainer.style.display = 'none';
        aggregatedResultsContainer.style.display = 'block';
    };

    const addEventListeners = () => {
        // Event listeners for checkbox filters
        document.querySelectorAll('#region-filter input').forEach(cb => cb.addEventListener('change', filterData));
        document.querySelectorAll('#rarity-filter input').forEach(cb => cb.addEventListener('change', filterData));
        document.querySelectorAll('#type-filter input').forEach(cb => cb.addEventListener('change', filterData));

        // Event listener for location filter
        locationFilter.addEventListener('input', filterData);

        // Event listeners for numeric filters
        document.querySelectorAll('.numeric-filter input').forEach(input => input.addEventListener('input', filterData));
        document.querySelectorAll('.comparison-select').forEach(select => select.addEventListener('change', filterData));

        // Show/Hide results
        document.getElementById('show-filtered').addEventListener('click', showFilteredResults);
        document.getElementById('show-aggregated').addEventListener('click', showAggregatedResults);
    };

    createCheckboxGroup('region-filter', uniqueRegions);
    createCheckboxGroup('rarity-filter', uniqueRarities);
    createCheckboxGroup('type-filter', uniqueTypes);

    // Initialize event listeners and tables
    addEventListeners();
    updateTable(data);
    updateAggregatedTable(data);
});
