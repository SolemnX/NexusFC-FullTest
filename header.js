document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');

    // Function to add the header HTML along with its styles
    function loadHeader() {
        if (headerContainer) {
            // Add header HTML
            headerContainer.innerHTML = `
                <style>
                    #main-header {
                        width: 100%;
                        background-color: #0077b6;
                        padding: 15px 0;
                        color: white;
                        text-align: center;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .header-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .header-nav {
                        display: flex;
                        gap: 15px;
                        margin-top: 10px;
                    }

                    .header-button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background-color 0.3s, transform 0.2s;
                    }

                    .header-button:hover {
                        background-color: #0056b3;
                        transform: scale(1.05);
                    }

                    .header-button:active {
                        background-color: #004085;
                        transform: scale(0.95);
                    }
                </style>
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
    }

    // Load header HTML with styles
    loadHeader();
});