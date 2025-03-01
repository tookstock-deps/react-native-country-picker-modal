import { FlatListProps } from 'react-native';
import { Country, CountryCode } from './types';
interface CountryListProps {
    data: Country[];
    filter?: string;
    filterFocus?: boolean;
    withFlag?: boolean;
    withEmoji?: boolean;
    withLetterScroller?: boolean;
    withCallingCode?: boolean;
    withCurrency?: boolean;
    flatListProps?: FlatListProps<Country>;
    onSelect(country: Country): void;
    preferredCountries?: CountryCode[];
}
export declare const CountryList: {
    (props: CountryListProps): JSX.Element;
    defaultProps: {
        filterFocus: undefined;
    };
};
export {};
