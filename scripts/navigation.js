document.addEventListener('DOMContentLoaded', () => {
    console.log("Navigation script loaded.");

    const ratesButton = document.getElementById('rates-button');
    const spawnButton = document.getElementById('spawn-button');
    const pokeButton = document.getElementById('poke-button');
    const mineButton = document.getElementById('mine-button');
    const backButton = document.getElementById('back-button');
    const locButton = document.getElementById('loc-button');
    const evlocButton = document.getElementById('evloc-button');

    if (ratesButton) {
        ratesButton.addEventListener('click', () => {
            console.log("Rates button clicked.");
            window.location.href = 'htmls/rates.html';
        });
    }

    if (spawnButton) {
        spawnButton.addEventListener('click', () => {
            console.log("Spawn button clicked.");
            window.location.href = 'htmls/spawn.html';
        });
    }

    if (pokeButton) {
        pokeButton.addEventListener('click', () => {
            console.log("Poke button clicked.");
            window.location.href = 'htmls/pokedata.html';
        });
    }

    if (mineButton) {
        mineButton.addEventListener('click', () => {
            console.log("Mine button clicked.");
            window.location.href = 'htmls/miningindex.html';
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log("Back button clicked.");
            window.location.href = 'htmls/index.html';
        });
    }

    if (locButton) {
        locButton.addEventListener('click', () => {
            console.log("Location button clicked.");
            window.location.href = 'htmls/location.html';
        });
    }

    if (evlocButton) {
        evlocButton.addEventListener('click', () => {
            console.log("EV Location button clicked.");
            window.location.href = 'htmls/evlocation.html';
        });
    }
});