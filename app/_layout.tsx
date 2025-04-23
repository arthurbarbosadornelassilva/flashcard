// layout.tsx -> Define as rotas com expo-router
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Flashcard",
          headerTitleAlign: "center",
          headerTintColor: "#007bff",
        }}
      />
      <Stack.Screen
        name="wordCollection"
        options={{
          title: "Word Collection",
          headerTitleAlign: "center",
          headerTintColor: "#007bff",
        }}
      />
    </Stack>
  );
}
