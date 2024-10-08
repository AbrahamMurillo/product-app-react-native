import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import MainLayout from '../../layouts/MainLayout'
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { getProductById, updateCreateProduct } from '../../../actions/products'
import { Producto } from '../../../domain/entities/product'
import CustomIcon from '../../components/ui/CustomIcon'
import { Formik } from 'formik'
import ProductSlide from '../../components/products/ProductSlide'
import { genders, sizes } from '../../../config/constast/constast'
import { CameraAdapter } from '../../../config/adapters/camera-adapter'

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export default function ProductScreen({ route }: Props) {

  const productIdRef = useRef(route.params.productId)
  //const { productId } = route.params
  const theme = useTheme()

  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  })

  const mutatation = useMutation({
    mutationFn: (data: Producto) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Producto) {
      productIdRef.current = data.id
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['product', productIdRef.current] })
    }
  })

  if (!product) {
    return <MainLayout title='Cargando...' />
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutatation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={values.title}
            subTitle={`Precio ${values.price}`}
            rightAction={async () => {
              // const photos = await CameraAdapter.takePicture()
              const photos = await CameraAdapter.getPicturesFromLibrary()
              setFieldValue('images', [...values.images, photos])
            }}
            rightActionIcon='image-outline'
          >
            <ScrollView style={{ flex: 1 }} >
              <Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems: "center" }} >
                <ProductSlide images={values.images} />
                <Layout style={{ marginHorizontal: 10, }}>
                  <Input
                    label="Titulo del producto"
                    value={values.title}
                    style={{ marginVertical: 5 }}
                    onChangeText={handleChange('title')}
                  />
                  <Input
                    label="Slug"
                    value={values.slug}
                    style={{ marginVertical: 5 }}
                    onChangeText={handleChange('slug')}
                  />
                  <Input
                    label="Descripcion"
                    value={values.description}
                    style={{ marginVertical: 5 }}
                    onChangeText={handleChange('description')}
                    multiline
                    numberOfLines={5}
                  />
                </Layout>
                <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                  <Input
                    label="Precio"
                    keyboardType='numeric'
                    value={values.price.toString()}
                    onChangeText={handleChange('price')}
                    style={{ flex: 1 }}
                  />
                  <Input
                    label="Inventario"
                    value={values.stock.toString()}
                    onChangeText={handleChange('stock')}
                    style={{ flex: 1 }}
                    keyboardType='numeric'
                  />
                </Layout>
              </Layout>
              <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size='small' appearance='outline' >
                {
                  sizes.map((size) => (
                    <Button
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter(s => s != size)
                          : [...values.sizes, size]
                      )}
                      style={{
                        flex: 1,
                        backgroundColor: values.sizes.includes(size) ? theme["color-primary-200"] : undefined
                      }}
                      key={size}>
                      {size}
                    </Button>
                  ))
                }
              </ButtonGroup>
              <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size='small' appearance='outline' >
                {
                  genders.map((gender) => (
                    <Button
                      onPress={() => setFieldValue('gender', gender)}
                      style={{
                        flex: 1,
                        backgroundColor: values.gender.startsWith(gender) ? theme["color-primary-200"] : undefined
                      }}
                      key={gender}>
                      {gender}
                    </Button>
                  ))
                }
              </ButtonGroup>
              <Button
                accessoryLeft={<CustomIcon name="save-outline" white />}
                onPress={() => handleSubmit()}
                disabled={mutatation.isPending}
                style={{ margin: 15 }}
              >
                Guardar
              </Button>
              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>
  )
}