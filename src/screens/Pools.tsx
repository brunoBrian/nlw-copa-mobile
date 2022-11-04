import { Text,  VStack, Icon } from 'native-base'
import { Octicons } from '@expo/vector-icons'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

export function Pools() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus bolões' showBackButton />

      <VStack mx={5} mt={6} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
        <Button 
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
        />
      </VStack>

      <Text color='gray.200' fontSize='sm' textAlign='center' px={10}>
        Você ainda não está participando de nenhum bolão, que tal {' '}
        <Text color='yellow.500' onPress={() => {}} underline>buscar um por código</Text> ou {' '}
        <Text color='yellow.500' onPress={() => {}} underline>criar um novo</Text>?
      </Text>
    </VStack>
  )
}
