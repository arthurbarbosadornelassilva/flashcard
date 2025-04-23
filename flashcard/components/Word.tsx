// Word.tsx -> Implementa o comportamento de flip entre frente e verso com animação.
import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import { Button } from "react-native-paper";
import FlipCard from "../components/FlipCard";
import { useRouter } from "expo-router";

type Props = {
    initialFront?: string;
    initialBack?: string;
};

const Word: React.FC<Props> = ({ initialFront = "", initialBack = "" }) => {
    const animate = useRef(new Animated.Value(0));
    const [isFlipped, setIsFlipped] = useState(false);
    const [front, setFront] = useState(initialFront);
    const [back, setBack] = useState(initialBack);

    const frontRef = useRef<TextInput>(null);
    const backRef = useRef<TextInput>(null);
    const router = useRouter();

    const doAFlip = () => {
        Animated.timing(animate.current, {
            duration: 300,
            toValue: isFlipped ? 0 : 180,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    };

    const rotateFront = {
        transform: [
            {
                rotateY: animate.current.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"],
                }),
            },
        ],
    };

    const rotateBack = {
        transform: [
            {
                rotateY: animate.current.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"],
                }),
            },
        ],
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
                <Animated.View
                    style={[styles.card, rotateFront]}
                    pointerEvents={isFlipped ? "none" : "auto"}
                >
                    <FlipCard
                        title="Front"
                        inputRef={frontRef}
                        onChange={setFront}
                        value={front}
                        autoFocus={!isFlipped}
                    />
                </Animated.View>

                <Animated.View
                    style={[styles.card, styles.backCard, rotateBack]}
                    pointerEvents={isFlipped ? "auto" : "none"}
                >
                    <FlipCard
                        title="Back"
                        inputRef={backRef}
                        onChange={setBack}
                        value={back}
                        autoFocus={isFlipped}
                    />
                </Animated.View>

                <Button
                    mode="contained"
                    onPress={doAFlip}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    Flip
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    backText: {
        fontSize: 16,
        color: "#007AFF",
        fontWeight: "600",
    },
    card: {
        backfaceVisibility: "hidden",
    },
    backCard: {
        position: "absolute",
        top: 0,
    },
    button: {
        marginTop: 50,
        height: 50,
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Word;
