import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loadig';
import { SignIn } from './src/screens/SignIn';
import { AuthContextProvider } from './src/context/Auth';
import { NewPool } from './src/screens/NewPool';
import { FindPool } from './src/screens/FindPool';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        {fontsLoaded ?  <FindPool /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}