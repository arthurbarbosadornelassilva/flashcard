import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type Props = TouchableOpacityProps& {
    text: string,
}

export function CustomButton({ text, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "blue",
        backgroundColor: "orange",
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    }
})