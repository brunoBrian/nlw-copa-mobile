import { Text,  VStack, Icon } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

export function Pools() {
  const { navigate } = useNavigation()

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus bolões' />

      <VStack mx={5} mt={6} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
        <Button 
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
          onPress={() => navigate('find')}
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
