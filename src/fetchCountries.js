const MAIN_URL = 'https://restcountries.eu/rest/v2/';

function fetchCountries(searchQuery) {
    return fetch(`${MAIN_URL}name/${searchQuery}`).then(r => r.json());
}

export default { fetchCountries };