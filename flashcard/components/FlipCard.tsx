// FlipCard.tsx -> Componente visual do card que recebe os valores via props.
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text } from "react-native";
import { Card } from "react-native-paper";

type Props = {
    value: string;
    onChange: (text: string) => void;
    inputRef: React.RefObject<TextInput>;
    title: string;
    autoFocus?: boolean;
};

const FlipCard: React.FC<Props> = ({
    title,
    value,
    onChange,
    inputRef,
    autoFocus,
}) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    placeholder="Escreva aqui!"
                    placeholderTextColor="#bdbdbd"
                    value={value}
                    onChangeText={onChange}
                    style={styles.textInput}
                    ref={inputRef}
                    autoFocus={autoFocus}
                />
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 250,
        height: 300,
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textInput: {
        fontSize: 18,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#000000",
        fontFamily: "Arial",
    },
});

export default FlipCard;
