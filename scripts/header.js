document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');

    // Function to add the header HTML along with its styles
    function loadHeader() {
        if (headerContainer) {
            // Add header HTML
            headerContainer.innerHTML = `
                <style>
                    /* Header Styling */
#main-header {
    background-color: #f8f9fa; /* Light background color for the header */
    padding: 10px 0; /* Vertical padding for header */
    border-bottom: 1px solid #dee2e6; /* Bottom border for separation */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}

/* Container for buttons */
.header-container {
    display: flex;
    justify-content: center; /* Center buttons horizontally */
    gap: 15px; /* Space between buttons */
}

/* General button styling for header buttons */
.header-button {
    background-color: #007bff; /* Primary button color */
    color: white; /* Text color */
    border: none; /* Remove default border */
    padding: 10px 20px; /* Top and bottom padding, left and right padding */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    font-size: 16px; /* Font size */
    transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
}

/* Button hover and active states */
.header-button:hover {
    background-color: #0056b3; /* Darker shade on hover */
    transform: scale(1.05); /* Slightly enlarge button on hover */
}

.header-button:active {
    background-color: #004085; /* Even darker shade when button is pressed */
    transform: scale(0.95); /* Slightly shrink button when pressed */
}

/* Specific styling for back button */
#back-button {
    background-color: #28a745; /* Different color for the back button */
}

#back-button:hover {
    background-color: #218838; /* Darker shade on hover */
}

#back-button:active {
    background-color: #1e7e34; /* Even darker shade when button is pressed */
}
                </style>
                <header id="main-header">
                    <div class="header-container">
                        <button class="header-button" id="back-button">Back to Home</button>
                        <button class="header-button" id="rates-button">Rates and Calculations</button>
                        <button class="header-button" id="spawn-button">Spawn Locator</button>
                        <button class="header-button" id="poke-button">Pokemon Data</button>
                        <button class="header-button" id="itemprize-button">Item-Prize-Craft</button>
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