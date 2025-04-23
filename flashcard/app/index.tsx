// index.tsx -> Mostra uma lista de palavras e leva pra /flashcard com params
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { router } from "expo-router";

const words = [
    { front: "Casa", back: "Home" },
    { front: "Gato", back: "Cat" },
    { front: "Cachorro", back: "Dog" },
];

export default function WordCollection() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sua Coleção de Palavras</Text>
            {words.map((word, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() =>
                        router.push({
                            pathname: "/flashcard",
                            params: {
                                front: word.front,
                                back: word.back,
                            },
                        })
                    }
                >
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.word}>
                                {word.front} ➜ {word.back}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>

            ))
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
    card: {
        width: "100%",
        marginBottom: 12,
    },
    word: {
        fontSize: 18,
    },
});
