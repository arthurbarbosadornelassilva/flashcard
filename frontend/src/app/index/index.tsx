import { Text, View } from "react-native";
import { styles } from "./style"
import { CustomButton } from "@/src/components/CustomButton";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memória de Elefante</Text>
      <CustomButton text="Jogar" onPress={() => { console.log("ok 1")}}></CustomButton>
      <CustomButton text="Coleções de cartas" onPress={() => { console.log("ok 2")}}></CustomButton>
    </View>
  );
}