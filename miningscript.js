const miningRocks = [
    { name: "Red Rock", class:"redrockclass", levelRequired: 1, gemStone: "Red Gemstone", minExp: 15, maxExp: 30, price: 50, respawn: "4 secs" },
    { name: "Blue Rock", class:"bluerockclass", levelRequired: 10, gemStone: "Blue Gemstone", minExp: 40, maxExp: 55, price: 100, respawn: "4-7 secs" },
    { name: "Green Rock", class:"greenrockclass", levelRequired: 20, gemStone: "Green Gemstone", minExp: 90, maxExp: 120, price: 200, respawn: "13 secs" },
    { name: "Prism Rock", class:"prismrockclass", levelRequired: 35, gemStone: "Prism Gemstone", minExp: 170, maxExp: 220, price: 400, respawn: "25-28 secs" },
    { name: "Pale Rock", class:"palerockclass", levelRequired: 50, gemStone: "Pale Gemstone", minExp: 330, maxExp: 480, price: 550, respawn: "45-55 secs" },
    { name: "Dark Rock", class:"darkrockclass", levelRequired: 65, gemStone: "Dark Gemstone", minExp: 150, maxExp: 200, price: 900, respawn: "120-180 secs" },
    { name: "Lava Rock", class:"lavarockclass", levelRequired: 65, gemStone: "3x Red Gemstones", minExp: 750, maxExp: 900, price: 150, respawn: "3-4 mins" },
    { name: "Rainbow Rock", class:"rainbowrockclass", levelRequired: 80, gemStone: "Rainbow Gemstone", minExp: 3000, maxExp: 4000, price: 20000, respawn: "20-30 mins" },
    { name: "Gold Rock", class:"goldrockclass", levelRequired: "Same as Base Rock", gemStone: "Gold Gemstone", minExp: 800, maxExp: 1000, price: 1500, respawn: "Fluctuates" }
];

// Populate the Mining Table
const miningTableBody = document.getElementById('mining-table-body');
miningRocks.forEach(rock => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class = ${rock.class}>${rock.name}</td>
        <td>${rock.levelRequired}</td>
        <td class = ${rock.class}>${rock.gemStone}</td>
        <td>${rock.minExp}</td>
        <td>${rock.maxExp}</td>
        <td>${rock.price}</td>
        <td>${rock.respawn}</td>
    `;
    miningTableBody.appendChild(row);
});

// Create Input Fields for All Gemstones (excluding Lava Gemstone)
const gemstoneInputs = document.getElementById('gemstone-inputs');
miningRocks.forEach(rock => {
    if (rock.gemStone !== "3x Red Gemstones") {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('form-group');
        inputGroup.innerHTML = `
            <label for="${rock.gemStone}" class = ${rock.class}>${rock.gemStone}:</label>
            <input type="number" id="${rock.gemStone.replace(/ /g, '-').toLowerCase()}" min="0" data-price="${rock.price}">
        `;
        gemstoneInputs.appendChild(inputGroup);
    }
});

// Create Result Fields for Each Gemstone (excluding Lava Gemstone)
const gemstoneResults = document.getElementById('gemstone-results');
miningRocks.forEach(rock => {
    if (rock.gemStone !== "3x Red Gemstones") {
        const resultGroup = document.createElement('div');
        resultGroup.classList.add('form-group');
        resultGroup.innerHTML = `
            <label for="result-${rock.gemStone.replace(/ /g, '-').toLowerCase()}" class = ${rock.class}>${rock.gemStone}:</label>
            <input type="text" id="result-${rock.gemStone.replace(/ /g, '-').toLowerCase()}" readonly>
        `;
        gemstoneResults.appendChild(resultGroup);
    }
});

// Calculate Total Value Based on All Gemstone Quantities (excluding Lava Gemstone)
document.getElementById('calculate-total-value').addEventListener('click', () => {
    let totalValue = 0;
    miningRocks.forEach(rock => {
        if (rock.gemStone !== "3x Red Gemstones") {
            const input = document.getElementById(rock.gemStone.replace(/ /g, '-').toLowerCase());
            const quantity = parseInt(input.value) || 0;
            const price = parseInt(input.getAttribute('data-price'));
            totalValue += quantity * price;
        }
    });
    document.getElementById('total-value').value = totalValue.toLocaleString();
});

// Calculate Required Gemstones Based on Desired Value (excluding Lava Gemstone)
document.getElementById('calculate-gemstones').addEventListener('click', () => {
    const desiredValue = parseInt(document.getElementById('desired-value').value);
    miningRocks.forEach(rock => {
        if (rock.gemStone !== "3x Red Gemstones") {
            const requiredQuantity = Math.ceil(desiredValue / rock.price);
            const resultInput = document.getElementById(`result-${rock.gemStone.replace(/ /g, '-').toLowerCase()}`);
            resultInput.value = requiredQuantity > 0 ? requiredQuantity : '';
        }
    });
});

const mlevels = {
    1: 41, 2: 48, 3: 67, 4: 104, 5: 165, 6: 256, 7: 383, 8: 552, 9: 769, 10: 1040,
    11: 1371, 12: 1768, 13: 2237, 14: 2784, 15: 3415, 16: 4136, 17: 5872, 18: 6899,
    19: 8040, 20: 9301, 21: 9301, 22: 10688, 23: 12207, 24: 13864, 25: 15665, 26: 17616,
    27: 19723, 28: 21992, 29: 24429, 30: 27040, 31: 29831, 32: 32808, 33: 35977, 34: 39344,
    35: 42915, 36: 46696, 37: 50693, 38: 54912, 39: 59359, 40: 64040, 41: 68961, 42: 74128,
    43: 79547, 44: 85224, 45: 91165, 46: 97376, 47: 103863, 48: 110632, 49: 117689, 50: 125040,
    51: 132691, 52: 140648, 53: 148917, 54: 157504, 55: 166415, 56: 175656, 57: 185233, 58: 195152,
    59: 205419, 60: 216040, 61: 227021, 62: 238368, 63: 250087, 64: 262184, 65: 274665, 66: 287536,
    67: 300803, 68: 314472, 69: 328549, 70: 343040, 71: 357951, 72: 373288, 73: 389057, 74: 405264,
    75: 421915, 76: 439016, 77: 456573, 78: 474592, 79: 493079, 80: 512040, 81: 531481, 82: 551408,
    83: 571827, 84: 592744, 85: 614165, 86: 636096, 87: 658543, 88: 681512, 89: 705009, 90: 729040,
    91: 753611, 92: 778728, 93: 804397, 94: 830624, 95: 857415, 96: 884776, 97: 912713, 98: 941232,
    99: 970339, 100: 0
};

document.getElementById('calculate-exp').addEventListener('click', () => {
    const startLevel = parseInt(document.getElementById('start-level').value);
    const endLevel = parseInt(document.getElementById('end-level').value);
    const expAmount = document.getElementById('exp-amount');
    const rockElements = document.querySelectorAll('#rock-list > div');
    
    if (startLevel >= 1 && endLevel <= 100 && startLevel < endLevel) {
        let totalExp = 0;
        for (let level = startLevel; level < endLevel; level++) {
            totalExp += mlevels[level] || 0;
        }

        expAmount.value = totalExp.toLocaleString();

        // Loop through each rock and calculate min/max rocks needed
        miningRocks.forEach(rock => {
            const minExp = rock.minExp;
            const maxExp = rock.maxExp;

            if (minExp && maxExp) {
                const minRocks = Math.ceil(totalExp / maxExp);
                const maxRocks = Math.ceil(totalExp / minExp);

                // Find the rock element in the list
                rockElements.forEach(rockElement => {
                    const label = rockElement.querySelector('label').textContent;
                    if (label === rock.name) {
                        rockElement.querySelector('.min-value').value = minRocks;
                        rockElement.querySelector('.max-value').value = maxRocks;
                    }
                });
            }
        });
    }
});

const baseValues = {
    common: { base: 1, shiny: 8192, dlbase: 1, dlshiny: 8192 },
    uncommon: { base: 6, shiny: 49152, dlbase: 4, dlshiny: 32768 },
    rare: { base: 48, shiny: 393216, dlbase: 30, dlshiny: 245760 },
    veryRare: { base: 480, shiny: 3932160, dlbase: 300, dlshiny: 2457600 },
    extremelyRare: { base: 4000, shiny: 32768000, dlbase: 2500, dlshiny: 20480000 },
    legendary: { base: 60000, shiny: 491520000, dlbase: 37500, dlshiny: 307200000 },
    GoldRushLegendary: { base: 30000, shiny: 245760000, dlbase: 18750, dlshiny: 153600000 }
};

const inputs = {
    rareCharmCheckbox: document.getElementById('rare-charm-checkbox'),
    hunterCharmCheckbox: document.getElementById('hunter-charm-checkbox'),
    honeyCheckbox: document.getElementById('honey-checkbox'),
    legend2Checkbox: document.getElementById('legend2-checkbox'),
    shinyCharmCheckbox: document.getElementById('shiny-charm-checkbox'),
    shiny2Checkbox: document.getElementById('shiny2-checkbox'),
    shinylureCheckbox: document.getElementById('shiny-lure-checkbox')
};

function applyModifiers() {
    const rareCharm = inputs.rareCharmCheckbox?.checked ?? false;
    const hunterCharm = inputs.hunterCharmCheckbox?.checked ?? false;
    const honey = inputs.honeyCheckbox?.checked ?? false;
    const shinyCharm = inputs.shinyCharmCheckbox?.checked ?? false;
    const legend2 = inputs.legend2Checkbox?.checked ?? false;
    const shinylure = inputs.shinylureCheckbox?.checked ?? false;
    const shiny2 = inputs.shiny2Checkbox?.checked ?? false;

    for (const [key, value] of Object.entries(baseValues)) {
        const base = document.getElementById(`${key}-base`);
        const shiny = document.getElementById(`${key}-shiny`);
        const dlbase = document.getElementById(`${key}-dlbase`);
        const dlshiny = document.getElementById(`${key}-dlshiny`);
        
        if (!base || !shiny) {
            console.error(`Element with ID ${key}-base or ${key}-shiny not found.`);
            continue;
        }
        
        if (!dlbase || !dlshiny) {
            console.error(`Element with ID ${key}-dlbase or ${key}-dlshiny not found.`);
            continue;
        }

        let baseValue = value.base;
        let shinyValue = value.shiny;
        let dlbaseValue = value.dlbase;
        let dlshinyValue = value.dlshiny;

        // Apply Shiny Charm modifications
        if (shinyCharm) {
            shinyValue = Math.round(shinyValue / 1.25);
            dlshinyValue = Math.round(dlshinyValue / 1.25);
        }
        if (shiny2) {
            shinyValue = Math.round(shinyValue / 2);
            dlshinyValue = Math.round(dlshinyValue / 2);
        }
        if (shinylure) {
            shinyValue = Math.round(shinyValue / 1.25);
            dlshinyValue = Math.round(dlshinyValue / 1.25);
        }
        // Apply Honey modifications
        if (honey) {
            if (baseValue !== 1) baseValue = Math.round(baseValue / 1.25);
            if (dlbaseValue !== 1) dlbaseValue = Math.round(dlbaseValue / 1.25);
            if (shinyValue !== 8192) shinyValue = Math.round(shinyValue / 1.25);
            if (dlshinyValue !== 8192) dlshinyValue = Math.round(dlshinyValue / 1.25);
        }
        if (legend2) {
            if (key == 'legendary' || key == 'GoldRushLegendary' ) baseValue = Math.round(baseValue / 2);
            if (key == 'legendary' || key == 'GoldRushLegendary' ) dlbaseValue = Math.round(dlbaseValue / 2);
            if (key == 'legendary' || key == 'GoldRushLegendary' ) shinyValue = Math.round(shinyValue / 2);
            if (key == 'legendary' || key == 'GoldRushLegendary' ) dlshinyValue = Math.round(dlshinyValue / 2);
        }
        // Apply Rare Charm and Hunter Charm modifications
        if (key !== 'common') {
            if (rareCharm) baseValue = Math.round(baseValue / 1.1);
            if (hunterCharm) baseValue = Math.round(baseValue / 1.2);
            if (rareCharm) shinyValue = Math.round(shinyValue / 1.1);
            if (hunterCharm) shinyValue = Math.round(shinyValue / 1.2);
        }
        
        if (key !== 'common') {
            if (rareCharm) dlbaseValue = Math.round(dlbaseValue / 1.1);
            if (hunterCharm) dlbaseValue = Math.round(dlbaseValue / 1.2);
            if (rareCharm) dlshinyValue = Math.round(dlshinyValue / 1.1);
            if (hunterCharm) dlshinyValue = Math.round(dlshinyValue / 1.2);
        }
        base.value = baseValue;
        shiny.value = shinyValue;
        dlbase.value = dlbaseValue;
        dlshiny.value = dlshinyValue;
    }
}

function handleExclusiveCheckboxes(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
        document.querySelectorAll('.box:first-child input[type=checkbox]').forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    }
    applyModifiers();
}

document.querySelectorAll('.box:first-child input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', handleExclusiveCheckboxes);
});

document.querySelectorAll('.box:last-child input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', applyModifiers);
});

applyModifiers(); // Initial call to set base values

const locations = {
    "Mt Moon": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/9yaakj1.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green"]
    },
    "Diglett's Cave": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/yolaKiM.jpeg",
        "GoldRush":"No",
        "Rocks": ["Red", "Blue"]
    },
    "Rock Tunnel": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/BC0cTsR.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green"]
    },
    "Seafoam Islands": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/UDDMk8D.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green", "Prism"]
    },
    "Hellfire Cavern": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/keaJNx7.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green", "Prism", "Pale", "Lava"]
    },
    "Turtle Cove": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/4WZbh6s.jpeg",
        "GoldRush":"No",
        "Rocks": ["Red", "Blue", "Green", "Prism"]
    },
    "Victory Road": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/2crdv5J.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green", "Prism", "Pale", "Dark"]
    },
    "Cerulean Cave": {
        "Region": "Kanto",
        "Map":"https://i.imgur.com/hU0pf4g.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Blue", "Green", "Prism", "Pale", "Dark"]
    },
    "Ember Cave": {
        "Region": "Johto",
        "Map":"https://i.imgur.com/WsQmDfw.jpeg",
        "GoldRush":"No",
        "Rocks": ["Lava"]
    },
    "Dark Cave": {
        "Region": "Johto",
        "Map":"https://i.imgur.com/x6YlNmT.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red", "Blue", "Green", "Prism", "Pale", "Dark"]
    },
    "Dragon's Den": {
        "Region": "Johto",
        "Map":"https://i.imgur.com/Xjh1jSJ.jpeg",
        "GoldRush":"No",
        "Rocks": ["Blue","Green", "Prism", "Pale"]
    },
    "Mossy Cave": {
        "Region": "Johto",
        "Map":"https://i.imgur.com/Xjh1jSJ.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Green", "Prism", "Pale", "Dark"]
    },
    "Mt Silver Cave": {
        "Region": "Hoenn",
        "Map":"https://i.imgur.com/Fp59G5R.jpeg",
        "GoldRush":"No",
        "Rocks": ["Lava"]
    },
    "Ancient Cave R3": {
        "Region": "Hoenn",
        "Map":"https://i.imgur.com/ffKiH2m.jpeg",
        "GoldRush":"No",
        "Rocks": ["Lava"]
    },
    "Ancient Dungeon": {
        "Region": "Hoenn",
        "Map":"https://i.imgur.com/ffKiH2m.jpeg",
        "GoldRush":"No",
        "Rocks": ["Prism", "Pale", "Dark", "Rainbow"]
    },
    "Oreburgh Cave": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/hGkHaTb.jpeg",
        "GoldRush":"No",
        "Rocks": ["Green", "Prism"]
    },
    "Deep Oreburgh Mine": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/btT3CvI.jpeg",
        "GoldRush":"No",
        "Rocks": ["Green", "Prism", "Pale", "Dark"]
    },
    "Sinnoh Underground": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/Sar8QVj.jpeg",
        "GoldRush":"No",
        "Rocks": ["Blue", "Prism", "Pale", "Dark", "Rainbow"]
    },
    "Mt. Coronet": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/t1wsX16.jpeg",
        "GoldRush":"Yes",
        "Rocks": ["Red","Blue", "Prism", "Pale", "Dark"]
    },
    "Celestic Ruins": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/AodZpV9.jpeg",
        "GoldRush":"No",
        "Rocks": ["Green", "Prism", "Pale"]
    },
    "Spear Pillar": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/HBTNuRe.jpeg",
        "GoldRush":"No",
        "Rocks": ["Green", "Prism", "Pale", "Dark", "Rainbow"]
    },
    "Sinnoh Safari Zone": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/WHk2Nwl.jpeg",
        "GoldRush":"No",
        "Rocks": ["Rainbow"]
    },
    "Stark Mountain": {
        "Region": "Sinnoh",
        "Map":"https://i.imgur.com/cBqRY2O.jpeg",
        "GoldRush":"No",
        "Rocks": ["Pale", "Dark", "Lava", "Rainbow"]
    },
    "Relic Passages": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/e0xUUjc.jpeg",
        "GoldRush":"No",
        "Rocks": ["Blue", "Green", "Prism", "Pale", "Dark"]
    },
    "Clay Tunnel": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/cw87beq.jpeg",
        "GoldRush":"No",
        "Rocks": ["Red", "Green", "Prism", "Pale", "Dark"]
    },
    "Twist Mountain": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/17QSxfQ.jpeg",
        "GoldRush":"No",
        "Rocks": ["Blue", "Prism", "Pale", "Dark", "Rainbow"]
    },
    "Giant Chasm": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/TrPzSwD.jpeg",
        "GoldRush":"No",
        "Rocks": ["Green", "Prism", "Pale", "Dark"]
    },
    "Deep Giant Chasm": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/TrPzSwD.jpeg",
        "GoldRush":"No",
        "Rocks": ["Pale", "Dark", "Rainbow"]
    },
    "Reversal Mountain": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/JGx8wid.jpeg",
        "GoldRush":"No",
        "Rocks": ["Red", "Prism", "Pale", "Dark", "Rainbow"]
    },
    "Unova Victory Road": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/k3W6aTa.jpeg",
        "GoldRush":"No",
        "Rocks": ["Prism", "Pale", "Dark"]
    },
    "Water Temple": {
        "Region": "Unova",
        "Map":"https://i.imgur.com/ZuQt1FP.jpeg",
        "GoldRush":"No",
        "Rocks": ["Dark", "Rainbow"]
    }
};

// Function to get rock class
function getRockClass(rock) {
    switch (rock) {
        case 'Red': return 'rock-red';
        case 'Blue': return 'rock-blue';
        case 'Green': return 'rock-green';
        case 'Prism': return 'rock-prism';
        case 'Pale': return 'rock-pale';
        case 'Lava': return 'rock-lava';
        case 'Dark': return 'rock-dark';
        case 'Rainbow': return 'rock-rainbow';
        default: return '';
    }
}

// Function to populate the table
function populateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    for (const [location, { Region, Map, GoldRush, Rocks }] of Object.entries(locations)) {
        Rocks.forEach(rock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <span class="location-name" data-map="${Map}">${location}</span>
                    <div class="tooltip">
                        <img src="${Map}" alt="Map">
                    </div>
                </td>
                <td>${Region}</td>
                <td>${GoldRush}</td>
                <td class="${getRockClass(rock)}">${rock}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to handle mouse movement for tooltip positioning
function handleMouseMove(event) {
    const tooltip = document.querySelector('.tooltip-show');
    if (tooltip) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        tooltip.style.left = `${mouseX + 10}px`; // Adjust the +10 to your preference
        tooltip.style.top = `${mouseY + 10}px`; // Adjust the +10 to your preference
    }
}

// Function to handle hover for showing tooltip
function handleMouseOver(event) {
    const target = event.target;
    if (target.classList.contains('location-name')) {
        const tooltip = target.nextElementSibling;
        tooltip.classList.add('tooltip-show');
    }
}

// Function to handle mouse out for hiding tooltip
function handleMouseOut(event) {
    const target = event.target;
    if (target.classList.contains('location-name')) {
        const tooltip = target.nextElementSibling;
        tooltip.classList.remove('tooltip-show');
    }
}

// Function to filter table rows
function filterTable() {
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();
    const regionFilter = document.getElementById('region-filter').value.toLowerCase();
    const goldrushFilter = document.getElementById('goldrush-filter').value.toLowerCase();
    const rockFilter = document.getElementById('rock-filter').value.toLowerCase();

    const rows = document.querySelectorAll('#table-body tr');

    rows.forEach(row => {
        const locationText = row.cells[0].textContent.toLowerCase();
        const regionText = row.cells[1].textContent.toLowerCase();
        const goldrushText = row.cells[2].textContent.toLowerCase();
        const rockText = row.cells[3].textContent.toLowerCase();

        const locationMatch = locationText.includes(locationFilter);
        const regionMatch = regionText.includes(regionFilter);
        const rockMatch = rockText.includes(rockFilter);
        const goldrushMatch = goldrushText.includes(goldrushFilter)

        if (locationMatch && regionMatch && rockMatch && goldrushMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Event listeners for filters and mouse movement
document.getElementById('location-filter').addEventListener('input', filterTable);
document.getElementById('region-filter').addEventListener('input', filterTable);
document.getElementById('rock-filter').addEventListener('input', filterTable);
document.getElementById('goldrush-filter').addEventListener('input', filterTable);

// Event listeners for tooltip visibility
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('mouseout', handleMouseOut);

// Initial table population
populateTable();

//Do Not Modify Below This Thanks!


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