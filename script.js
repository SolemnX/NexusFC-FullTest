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