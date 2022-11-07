import { useRoute } from '@react-navigation/native'
import { HStack,  useToast,  VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Share } from 'react-native'

import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { Guesses } from '../components/Guesses'
import { Header } from '../components/Header'
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
        title: 'Não foi possível carregar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetail()
  }, [id])

  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title={poolDetails?.title} onShare={handleCodeShare} showBackButton showShareButton />

      <VStack px={5}>
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

      {poolDetails?._count?.participants > 0 ? (
          <Guesses poolId={poolDetails?.id} />
      ) : <EmptyMyPoolList code={poolDetails?.code} onShare={handleCodeShare} />}

    </VStack>
  )
}