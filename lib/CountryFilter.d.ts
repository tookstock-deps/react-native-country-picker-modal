import { TextInputProps } from 'react-native';
export interface CountryFilterProps extends TextInputProps {
    thwarted?: boolean;
}
export declare const CountryFilter: {
    ({ thwarted, ...props }: CountryFilterProps): JSX.Element;
    defaultProps: {
        autoFocus: boolean;
        placeholder: string;
    };
};
