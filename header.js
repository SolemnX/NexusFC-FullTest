function loadHeader() {
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadHeader);