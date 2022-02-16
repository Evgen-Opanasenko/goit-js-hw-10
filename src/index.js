import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refInput = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryRef = document.querySelector('.country-info');
const blakHole = '';

function addRender(rendA, rendB) {
  countryListRef.innerHTML = rendA;
  countryRef.innerHTML = rendB;

  //   countryListRef.innerHTML = length === 1 ? '' : markup;
  //   countryRef.innerHTML = length === 1 ? markup : '';
}

const getCountry = e => {
  const countryKey = e.target.value.trim();
  console.log(countryKey);
  fetchCountries(countryKey)
    .then(response => {
      const lengthResponse = response.length;
      console.log(lengthResponse);
      if (lengthResponse > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        addRender(blakHole, blakHole);
        return;
      }
      if (lengthResponse === 1) {
        countryMarkup(response);
      } else {
        countryList(response);
      }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
};

const countryMarkup = array => {
  const markup = array
    .map(({ flags, name, capital, population, languages }) => {
      return `<div>
<img src="${flags.svg}" alt="${name.common}" width="200" height="100">
            <h2 class="item-name">${name.official}</h2>
</div >
<p>
<span>Capital: </span>${capital}
</p>
<p>
<span>Population: </span>${population}
</p>
<p>
<span>Languages: </span>${Object.values(languages).join(', ')}`;
    })
    .join('');
  //   countryRef.innerHTML = markup;
  //   countryListRef.innerHTML = '';
  addRender(blakHole, markup);
};

function countryList(array) {
  console.log(array);
  const markup = array
    .map(({ name, flags }) => {
      console.log(flags);
      return `<li class="item">
            <img src="${flags.svg}" alt="${name.common}" width="100" height="50">
            <h2 class="item-name">${name.official}</h2>
            </li>`;
    })
    .join('');

  //   countryListRef.innerHTML = markup;
  //   countryRef.innerHTML = '';
  addRender(markup, blakHole);
}
// refInput.addEventListener('input', getCountry);

refInput.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));
