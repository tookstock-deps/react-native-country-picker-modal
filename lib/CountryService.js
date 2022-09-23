import { FlagType, CountryCodeList, } from './types';
import Fuse from 'fuse.js';
const imageJsonUrl = 'https://xcarpentier.github.io/react-native-country-picker-modal/countries/';
const localData = {
    emojiCountries: undefined,
    imageCountries: undefined,
};
export const loadDataAsync = ((data) => (dataType = FlagType.EMOJI) => {
    return new Promise((resolve, reject) => {
        switch (dataType) {
            case FlagType.FLAT:
                if (!data.imageCountries) {
                    fetch(imageJsonUrl)
                        .then((response) => response.json())
                        .then((remoteData) => {
                        data.imageCountries = remoteData;
                        resolve(data.imageCountries);
                    })
                        .catch(reject);
                }
                else {
                    resolve(data.imageCountries);
                }
                break;
            default:
                if (!data.emojiCountries) {
                    data.emojiCountries = require('./assets/data/countries-emoji.json');
                    resolve(data.emojiCountries);
                }
                else {
                    resolve(data.emojiCountries);
                }
                break;
        }
    });
})(localData);
export const getEmojiFlagAsync = async (countryCode = 'FR') => {
    const countries = await loadDataAsync();
    if (!countries) {
        throw new Error('Unable to find emoji because emojiCountries is undefined');
    }
    if (!countries[countryCode]) {
        throw new Error(`Country code ${countryCode} is unknown`);
    }
    return countries[countryCode].flag;
};
export const getImageFlagAsync = async (countryCode = 'FR') => {
    const countries = await loadDataAsync(FlagType.FLAT);
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    if (!countries[countryCode]) {
        throw new Error(`Country code ${countryCode} is unknown`);
    }
    return countries[countryCode].flag;
};
export const getCountryNameAsync = async (countryCode = 'FR', translation = 'common') => {
    const countries = await loadDataAsync();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    if (!countries[countryCode]) {
        throw new Error(`Country code ${countryCode} is unknown`);
    }
    return countries[countryCode].name
        ? countries[countryCode].name[translation]
        : countries[countryCode].name['common'];
};
export const getCountryCallingCodeAsync = async (countryCode) => {
    const countries = await loadDataAsync();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].callingCode[0];
};
export const getCountryCurrencyAsync = async (countryCode) => {
    const countries = await loadDataAsync();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].currency[0];
};
const isCountryPresent = (countries) => ((countryCode) => (!!countries[countryCode]));
const isRegion = (region) => (country) => region ? country.region === region : true;
const isSubregion = (subregion) => (country) => subregion ? country.subregion === subregion : true;
const isIncluded = (countryCodes) => (country) => countryCodes && countryCodes.length > 0
    ? countryCodes.includes(country.cca2)
    : true;
const isExcluded = (excludeCountries) => (country) => excludeCountries && excludeCountries.length > 0
    ? !excludeCountries.includes(country.cca2)
    : true;
const isDependent = (withDependents) => {
    if (withDependents) {
        return () => true;
    }
    return (country) => (country.independent);
};
export const getCountriesAsync = async (flagType, translation, region, subregion, countryCodes, excludeCountries, preferredCountries = [], withDependents) => {
    const countriesRaw = await loadDataAsync(flagType);
    if (!countriesRaw) {
        return [];
    }
    const preferred = new Set(preferredCountries || []);
    const countries = CountryCodeList.filter(isCountryPresent(countriesRaw))
        .map((cca2) => {
        const country = { ...countriesRaw[cca2] };
        const names = country.name;
        const deburred = names.deburred;
        const name = names[translation || 'common'] || names.common;
        const burrfree = names[translation || 'deburred'] || deburred;
        return {
            name,
            ...country,
            name,
            cca2,
            names,
            burrfree,
            deburred,
        };
    })
        .filter(isRegion(region))
        .filter(isSubregion(subregion))
        .filter(isIncluded(countryCodes))
        .filter(isExcluded(excludeCountries))
        .filter(isDependent(withDependents))
        .sort((country1, country2) => {
        const preferred1 = preferred.has(country1.cca2);
        if (preferred1 !== preferred.has(country2.cca2)) {
            return preferred1 ? -1 : 1;
        }
        return country1.name.localeCompare(country2.name);
    });
    return countries;
};
const DEFAULT_FUSE_OPTION = {
    shouldSort: false,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    isCaseSensitive: false,
    keys: ['name', 'cca2', 'callingCode', 'deburred', 'altsearc'],
};
let fuse;
export const search = (filter = '', data = []) => {
    const searchtext = (filter || '').replace(/[\p{Punctuation}\p{Separator}]+/gu, '');
    if (data.length === 0) {
        return [];
    }
    if (!searchtext) {
        return data;
    }
    if (!fuse) {
        const fuseConfig = { ...DEFAULT_FUSE_OPTION };
        fuse = new Fuse(data, fuseConfig);
    }
    const result = fuse.search(searchtext);
    return result.map(({ item }) => item);
};
const uniq = (arr) => Array.from(new Set(arr));
export const getScrollerLetter = (country, preferredCountries) => {
    if (preferredCountries.includes(country.cca2)) {
        return '!';
    }
    return country.burrfree.substr(0, 1).toLocaleUpperCase();
};
const MAX_SCROLLER_LENGTH = 30;
export const getLetters = (countries, preferredCountries) => {
    const allLetters = uniq(countries
        .map((country) => getScrollerLetter(country, preferredCountries))
        .sort((l1, l2) => l1.localeCompare(l2)));
    const total = allLetters.length;
    if (total <= MAX_SCROLLER_LENGTH) {
        return allLetters;
    }
    const letters = [];
    allLetters.forEach((letter, ii) => {
        const idx = Math.floor(MAX_SCROLLER_LENGTH * (ii / total));
        if (idx >= letters.length) {
            letters.push(letter);
        }
    });
    return letters;
};
export const getCountryInfoAsync = async ({ countryCode, translation, }) => {
    const countryName = await getCountryNameAsync(countryCode, translation || 'common');
    const currency = await getCountryCurrencyAsync(countryCode);
    const callingCode = await getCountryCallingCodeAsync(countryCode);
    return { countryName, currency, callingCode };
};
//# sourceMappingURL=CountryService.js.map