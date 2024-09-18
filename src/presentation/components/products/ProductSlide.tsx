import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
    images: string[];

}

export default function ProductSlide({ images }: Props) {
    return (
        <>
            {
                (images.length === 0)
                    ? <Image
                        source={require('../../../assets/no-product-image.png')}
                        style={{
                            width: 300,
                            height: 300,
                            margin: 7,
                        }} />
                    : (
                        <FlatList
                            data={images}
                            horizontal
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <FadeInImage
                                    uri={item}
                                    style={{
                                        width: 300,
                                        height: 300,
                                        margin: 7,
                                    }}
                                />
                            )}
                        />
                    )
            }
        </>
    )
}