// Flashcard.tsx -> Recebe os parâmetros front e back e renderiza o componente Word.
import { View } from "react-native";
import Word from "../components/Word";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const { front, back } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Word initialFront={front as string} initialBack={back as string} />
    </View>
  );
}
