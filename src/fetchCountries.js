const MAIN_URL = 'https://restcountries.eu/rest/v2/';

function fetchCountries(searchQuery) {
    return fetch(`${MAIN_URL}name/${searchQuery}`).then(r => {
        if (!r.ok) {
            throw Error;
        } else {
            return (r.json());
        }
    });
}

export default { fetchCountries };