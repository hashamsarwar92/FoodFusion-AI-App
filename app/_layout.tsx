import { LogtoConfig, LogtoProvider, UserScope } from "@logto/rn";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const config: LogtoConfig = {
    endpoint: "https://bnaclb.logto.app/",
    appId: "80ipwxky1v7qhrwcv7xla",
    scopes: [UserScope.Email],
  };
  return (
    <LogtoProvider config={config}>
      <Stack>
        <Stack.Screen name="Landing" options={{ headerShown: false }} />
      </Stack>
    </LogtoProvider>
  );
}
