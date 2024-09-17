import { View, Text, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Producto } from '../../../domain/entities/product'
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  products: Producto[];
  fetchNextPage: () => void;
}

export default function ProductsList({ products, fetchNextPage }: Props) {

  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()

  const onPullToRefresh = async () => {
    setIsRefreshing(true)
    queryClient.cancelQueries({queryKey:['products','infinite']})
    setIsRefreshing(false)
  }

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <ProductCard product={item} />
      )}
      ListFooterComponent={<Layout style={{ height: 150, }} ></Layout>}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onPullToRefresh}
        />
      }
    />
  )
}