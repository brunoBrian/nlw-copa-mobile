import { useNavigation } from '@react-navigation/native'
import { Heading,  useToast,  VStack } from 'native-base'
import { useState } from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { api } from '../services/api'

export function FindPool() {
  const toast = useToast()
  const { navigate } = useNavigation()
  
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if(!code.trim()) {
        return toast.show({
          title: 'Informe o código!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('/pools/join', {
        code
      })

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('pools')
    } catch(err) {
      console.log(err.response.data)
      setIsLoading(false)

      if(err?.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if(err?.response?.data?.message === 'You already joined this pool') {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possivel encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mx={5} alignItems='center'>
        <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
          Encontre um bolão através de seu código único
        </Heading>

        <Input 
          placeholder='Qual o código do bolão?' 
          mb={2} 
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button 
          title='BUSCAR BOLÃO' 
          onPress={handleJoinPool} 
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
