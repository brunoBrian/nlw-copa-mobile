import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loadig';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ?  <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}