import { Stack } from "expo-router";
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { store } from "@/store";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
    <PaperProvider>
    <Stack>
      <Stack.Screen name="index"  options={{ headerShown: false }} />
      <Stack.Screen name="screens/common/MainView"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/common/Entry"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/common/Start"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Pickup"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Login"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Account"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Activity"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Home"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/pages/Services"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/component/Authenticate"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/component/Confirm"  options={{ headerShown: false }}/>
      <Stack.Screen name="screens/component/Payment"  options={{ headerShown: false }}/>
    </Stack>
    </PaperProvider>
    </Provider>
    </SafeAreaProvider>
  );
}
