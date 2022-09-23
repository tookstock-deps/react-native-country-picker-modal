import { StyleProp, ViewStyle, ImageSourcePropType, ImageStyle } from 'react-native';
interface CloseButtonProps {
    style?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    image?: ImageSourcePropType;
    onPress?(): void;
}
declare const _default: (props: CloseButtonProps) => JSX.Element;
export default _default;
