import React, { useState, useEffect } from 'react';
import { CountryModal } from './CountryModal';
import { HeaderModal } from './HeaderModal';
import { FlagType } from './types';
import { CountryFilter } from './CountryFilter';
import { FlagButton } from './FlagButton';
import { useContext } from './CountryContext';
import { CountryList } from './CountryList';
const renderFlagButton = (props) => props.renderFlagButton ? (props.renderFlagButton(props)) : (React.createElement(FlagButton, { ...props }));
const renderFilter = (props) => props.renderCountryFilter ? (props.renderCountryFilter(props)) : (React.createElement(CountryFilter, { ...props }));
export const CountryPicker = (props) => {
    const { allowFontScaling, countryCode, region, subregion, countryCodes, renderFlagButton: renderButton, renderCountryFilter, filterProps, modalProps, flatListProps, onSelect, withEmoji, withFilter, withCloseButton, withCountryNameButton, withCallingCodeButton, withCurrencyButton, containerButtonStyle, withLetterScroller, withCallingCode, withCurrency, withFlag, withDependents, withModal, disableNativeModal, withFlagButton, onClose: handleClose, onOpen: handleOpen, closeButtonImage, closeButtonStyle, closeButtonImageStyle, excludeCountries, placeholder, preferredCountries, } = props;
    const [state, setState] = useState({
        visible: props.visible || false,
        countries: [],
        filter: '',
        filterFocus: false,
    });
    const { search, translation, getCountriesAsync } = useContext();
    const { visible, filter, countries, filterFocus } = state;
    useEffect(() => {
        if (state.visible !== props.visible) {
            setState({ ...state, visible: props.visible || false });
        }
    }, [props.visible]);
    const onOpen = () => {
        setState({ ...state, visible: true });
        if (handleOpen) {
            handleOpen();
        }
    };
    const onClose = () => {
        setState({ ...state, filter: '', visible: false });
        if (handleClose) {
            handleClose();
        }
    };
    const setFilter = (filter) => setState({ ...state, filter });
    const setCountries = (countries) => setState({ ...state, countries });
    const onSelectClose = (country) => {
        onSelect(country);
        onClose();
    };
    const onFocus = () => setState({ ...state, filterFocus: true });
    const onBlur = () => setState({ ...state, filterFocus: false });
    const flagProp = {
        allowFontScaling,
        countryCode,
        withEmoji,
        withCountryNameButton,
        withCallingCodeButton,
        withCurrencyButton,
        withFlagButton,
        renderFlagButton: renderButton,
        onOpen,
        containerButtonStyle,
        placeholder,
    };
    useEffect(() => {
        let cancel = false;
        getCountriesAsync(withEmoji ? FlagType.EMOJI : FlagType.FLAT, translation, region, subregion, countryCodes, excludeCountries, preferredCountries, withDependents)
            .then(countries => cancel ? null : setCountries(countries))
            .catch(console.warn);
        return (() => { cancel = true; });
    }, [translation, withEmoji, countryCodes, excludeCountries, preferredCountries, withDependents]);
    const searchResult = search(filter, countries);
    const thwarted = (searchResult.length === 0);
    const displayData = thwarted ? countries : searchResult;
    return (React.createElement(React.Fragment, null,
        withModal && renderFlagButton(flagProp),
        React.createElement(CountryModal, { ...{ visible, withModal, disableNativeModal, ...modalProps }, onRequestClose: onClose, onDismiss: onClose },
            React.createElement(HeaderModal, { ...{
                    withFilter,
                    onClose,
                    closeButtonImage,
                    closeButtonImageStyle,
                    closeButtonStyle,
                    withCloseButton,
                }, renderFilter: (props) => renderFilter({
                    ...props,
                    allowFontScaling,
                    renderCountryFilter,
                    onChangeText: setFilter,
                    value: filter,
                    onFocus,
                    onBlur,
                    thwarted,
                    ...filterProps,
                }) }),
            React.createElement(CountryList, { ...{
                    onSelect: onSelectClose,
                    data: displayData,
                    letters: [],
                    withLetterScroller,
                    withCallingCode,
                    withCurrency,
                    withFlag,
                    withEmoji,
                    filter,
                    filterFocus,
                    flatListProps,
                    preferredCountries,
                } }))));
};
CountryPicker.defaultProps = {
    withModal: true,
    withCallingCode: false,
    placeholder: 'Select Country',
    allowFontScaling: true,
};
//# sourceMappingURL=CountryPicker.js.map