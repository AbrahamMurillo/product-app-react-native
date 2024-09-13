import React from 'react'
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { getProductsByPage } from '../../../actions/products/get-products-by-page'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import MainLayout from '../../layouts/MainLayout'
import FullScreenLoader from '../../components/FullScreenLoader'
import ProductsList from '../../components/products/ProductsList'

export default function HomeScreen() {
  const { logout } = useAuthStore()

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // })

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async (params) => {
      const products = await getProductsByPage(params.pageParam)
      return products
    },
    getNextPageParam: (lastPage, allPages) => allPages.length
  })

  //getProductsByPage(0)
  return (
    <MainLayout
      title='Teslo-App - Products'
      subTitle='Administracion'
    >
      {
        isLoading
          ? (<FullScreenLoader />)
          : <ProductsList fetchNextPage={fetchNextPage} products={data?.pages.flat() ?? []} />
      }
    </MainLayout>
  )
}