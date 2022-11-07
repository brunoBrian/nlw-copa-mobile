import { Text,  VStack, Icon, useToast, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { PoolCard, PoolCardPros } from '../components/PoolCard'
import { Loading } from '../components/Loadig'
import { EmptyPoolList } from '../components/EmptyPoolList'

export function Pools() {
  const { navigate } = useNavigation()
  const toast = useToast()

  const [pools, setPools] = useState<PoolCardPros[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchPools() {
    try {
      setIsLoading(true)

      const { data } = await api.get('/pools')

      setPools(data)
    } catch(err) {
      console.log(err)
      toast.show({
        title: 'Não foi possivel carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPools()
  }, [])
  

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

      {isLoading ? <Loading /> : 
        <FlatList
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10, mt: 5 }}
          ListEmptyComponent={<EmptyPoolList />}
        />
      }
    </VStack>
  )
}
