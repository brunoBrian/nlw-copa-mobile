import { useNavigation, useRoute } from '@react-navigation/native'
import { Heading,  HStack,  useToast,  VStack } from 'native-base'
import { useEffect, useState } from 'react'

import { Button } from '../components/Button'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Loading } from '../components/Loadig'
import { Option } from '../components/Option'
import { PoolCardPros } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader'
import { api } from '../services/api'

interface RouteParams {
  id: string;
}

export function DetailsPool() {
  const { params } = useRoute()
  const toast = useToast()

  const { id } = params as RouteParams;

  const [isLoading, setIsLoading] = useState(false)
  const [optionSelected, setOptionSelected] = useState<'1' | '2'>('1')
  const [poolDetails, setPoolDetails] = useState<PoolCardPros>()

  async function fetchPoolDetail() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/pools/${id}`)

      setPoolDetails(data)
    } catch(err) {
      console.log(err);

      toast.show({
        title: 'Erro ao carregar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolDetail()
  }, [id])

  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title={id} showBackButton showShareButton />

      {poolDetails?._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bg='gray.800' p={1} rounded='sm' mb={5}>
            <Option 
              title='Seus palpites'
              isSelected={optionSelected === '1'} 
              onPress={() => setOptionSelected('1')}
            />
            <Option 
              title='Ranking do grupo'
              isSelected={optionSelected === '2'} 
              onPress={() => setOptionSelected('2')}
            />
          </HStack> 
        </VStack>
      ) : <EmptyMyPoolList code={poolDetails?.code} />}
    </VStack>
  )
}