import './styles.css';
import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';
import API from './fetchCountries.js';

import templateItem from './templates/list.hbs';

import templateCard from './templates/card.hbs';


const debounce = require('lodash.debounce');

const ref = {
    input: document.querySelector('#country-name'),
    results: document.querySelector('.search-results')
}

ref.input.addEventListener('input', debounce(showSearchResult, 500));


function showSearchResult(event) {
    cleanSearchResults();
    const inputQuery = event.target.value;
    if (!inputQuery) {
        return;
    }
    searchChecking(inputQuery);

}

function cleanSearchResults() {
    while (ref.results.firstChild) {
        ref.results.removeChild(ref.results.lastChild);
    }
}

function notification() {
    error({
        type: 'error',
        text: "Too many matches found. Please specify your query.",
        hide: true,
        delay: '1000',
        closer: false,
        sticker: false
    });
}

function searchChecking(inputQuery) {
    API.fetchCountries(inputQuery).then(result => {
        if (result.length > 10) {
            notification();
        } else if (result.length === 1) {
            updateResult(templateCard, result[0]);
        } else {
            updateResult(templateItem, result);
        }
    }).catch(error => {
        console.log(error);
    });
}

function updateResult(makeTemplate, result) {
    const markUp = makeTemplate(result)
    ref.results.insertAdjacentHTML('beforeend', markUp);
}