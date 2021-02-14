const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

fetch(endpoint) // fetch returns a promise
  .then(blob => blob.json()) // making the blob object json
  .then(data => cities.push(...data)); // using spread operator to make an individual array

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi'); // global and insensitive case
    return place.city.match(regex) || place.state.match(regex); // city and state are array properties
  });
}

// adding commas to the population numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      ); // highlighting
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      ); //highlighting
      return `
  <li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
  </li>
  `;
    })
    .join(''); // display results with comma separator
  suggestions.innerHTML = html;
}

// grab the html classes
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// filter from click or keyup
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
