import { Heading,  VStack } from 'native-base'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'

export function FindPool() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mx={5} alignItems='center'>
        <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
          Encontre um bolão através de seu código único
        </Heading>

        <Input placeholder='Qual o código do bolão?' mb={2} />
        <Button title='BUSCAR BOLÃO' />
      </VStack>
    </VStack>
  )
}
