import { CountryCode, Country, TranslationLanguageCode, FlagType, Region, Subregion } from './types';
declare type CountryMap = {
    [key in CountryCode]: Country;
};
export declare const loadDataAsync: (dataType?: FlagType) => Promise<CountryMap>;
export declare const getEmojiFlagAsync: (countryCode?: CountryCode) => Promise<string>;
export declare const getImageFlagAsync: (countryCode?: CountryCode) => Promise<string>;
export declare const getCountryNameAsync: (countryCode?: CountryCode, translation?: TranslationLanguageCode) => Promise<string>;
export declare const getCountryCallingCodeAsync: (countryCode: CountryCode) => Promise<string>;
export declare const getCountryCurrencyAsync: (countryCode: CountryCode) => Promise<string>;
export declare const getCountriesAsync: (flagType: FlagType, translation?: TranslationLanguageCode, region?: Region, subregion?: Subregion, countryCodes?: CountryCode[], excludeCountries?: CountryCode[], preferredCountries?: CountryCode[], withDependents?: boolean) => Promise<Country[]>;
export declare const search: (filter?: string, data?: Country[]) => Country[];
export declare const getScrollerLetter: (country: Country, preferredCountries: CountryCode[]) => string;
export declare const getLetters: (countries: Country[], preferredCountries: CountryCode[]) => any[];
export interface CountryInfo {
    countryName: string;
    currency: string;
    callingCode: string;
}
export declare const getCountryInfoAsync: ({ countryCode, translation, }: {
    countryCode: CountryCode;
    translation?: "common" | "deburred" | "ces" | "deu" | "fra" | "hrv" | "ita" | "jpn" | "nld" | "por" | "rus" | "slk" | "spa" | "fin" | "est" | "zho" | "pol" | "urd" | "kor" | "isr" | "ara" | "per" | "fas" | "eng" | "cym" | undefined;
}) => Promise<CountryInfo>;
export {};
