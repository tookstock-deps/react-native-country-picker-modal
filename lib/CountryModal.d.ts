import * as React from 'react';
import { ModalProps } from 'react-native';
export declare const CountryModal: {
    ({ children, withModal, disableNativeModal, ...props }: import("react-native").ModalBaseProps & import("react-native").ModalPropsIOS & import("react-native").ModalPropsAndroid & import("react-native").ViewProps & {
        children: React.ReactNode;
        withModal?: boolean | undefined;
        disableNativeModal?: boolean | undefined;
    }): JSX.Element | null;
    defaultProps: {
        animationType: string;
        animated: boolean;
        withModal: boolean;
        disableNativeModal: boolean;
    };
};
