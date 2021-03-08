const debounce = require('lodash.debounce');
import './styles.css';
import getRefs from './js/get-refs';
import fetchCountries from './js/fetchCountries';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile';
import countryCard from './templates/countryCard.hbs';
import 'material-design-icons/iconfont/material-icons.css';

const refs = getRefs();
const debouncedInputEvent = debounce(handleGetName, 500);
refs.inputCountryName.addEventListener("input", debouncedInputEvent);

function handleGetName(event) {
    const name = (event.target.value).toLowerCase();
    fetchCountries(`${name}`).then(results => {
        if (results.length === 1) {
            const murkup = countryCard(results[0]);
            refs.informationSection.innerHTML = murkup;
        }
        if (results.length > 1 && results.length <= 10) {
            const listItemsCountry = createListItemCountry(results);
            const allListCountry = `<ul>${listItemsCountry}</ul>`;
            refs.informationSection.innerHTML = allListCountry;
        }
        if (results.length > 10) {
            refs.informationSection.innerHTML = ' ';
            defaultModules.set(PNotifyMobile, {});

            error({
            text: 'Too many matches found. Please enter a more specific query!',
            type: 'error',
            delay: 2000
            });
        }
    });
}
function createListItemCountry(items) {
    return items.map(item => `<li class="country-item">${item.name}</li>`).join('');
}


