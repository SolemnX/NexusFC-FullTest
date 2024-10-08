document.addEventListener('DOMContentLoaded', () => {
    console.log("Navigation script loaded.");

    const ratesButton = document.getElementById('rates-button');
    const spawnButton = document.getElementById('spawn-button');
    const pokeButton = document.getElementById('poke-button');
    const itemprizeButton = document.getElementById('itemprize-button');
    const mineButton = document.getElementById('mine-button');
    const backButton = document.getElementById('back-button');
    const locButton = document.getElementById('loc-button');
    const evlocButton = document.getElementById('evloc-button');

    if (ratesButton) {
        ratesButton.addEventListener('click', () => {
            console.log("Rates button clicked.");
            window.location.href = 'rates.html';
        });
    }

    if (spawnButton) {
        spawnButton.addEventListener('click', () => {
            console.log("Spawn button clicked.");
            window.location.href = 'spawn.html';
        });
    }

    if (pokeButton) {
        pokeButton.addEventListener('click', () => {
            console.log("Poke button clicked.");
            window.location.href = 'pokedata.html';
        });
    }

    if (itemprizeButton) {
        itemprizeButton.addEventListener('click', () => {
            console.log("ItemPrize button clicked.");
            window.location.href = 'item.html';
        });
    }

    if (mineButton) {
        mineButton.addEventListener('click', () => {
            console.log("Mine button clicked.");
            window.location.href = 'miningindex.html';
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log("Back button clicked.");
            window.location.href = 'index.html';
        });
    }

    if (locButton) {
        locButton.addEventListener('click', () => {
            console.log("Location button clicked.");
            window.location.href = 'location.html';
        });
    }

    if (evlocButton) {
        evlocButton.addEventListener('click', () => {
            console.log("EV Location button clicked.");
            window.location.href = 'evlocation.html';
        });
    }
});