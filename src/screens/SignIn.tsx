import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <Center flex={1} bgColor='gray.900' padding={7}>
      <Logo />

      <Button 
      mt={12}
        type='secondary'
        title='Entrar com o Google' 
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />} 
      />

      <Text textAlign='center' color='white' mt={4}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
