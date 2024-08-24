document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');

    if (headerContainer) {
        headerContainer.innerHTML = `
            <header id="main-header">
                <div class="header-container">
                    <button class="header-button" id="back-button">Back to Home</button>
                    <button class="header-button" id="rates-button">Rates and Calculations</button>
                    <button class="header-button" id="spawn-button">Spawn Locator</button>
                    <button class="header-button" id="poke-button">Pokemon Data</button>
                    <button class="header-button" id="mine-button">Mining Guide</button>
                    <button class="header-button" id="loc-button">Location Guide</button>
                    <button class="header-button" id="evloc-button">EV Location Guide</button>
                </div>
            </header>
        `;
        console.log("Header inserted successfully.");
    } else {
        console.error('Header container not found.');
    }
});