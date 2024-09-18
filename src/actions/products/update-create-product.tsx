import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Producto } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Producto>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)

    if (product.id && product.id != "new") {
        return updateProduct(product)
    }
    return createProduct(product)
}

const updateProduct = async (product: Partial<Producto>) => {

    const { id, images = [], ...rest } = product

    try {
        const checkedImages = prepareImage(images)
        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error)) {
            console.log(error.request?.data)
        }
        throw new Error('Error en la actualizacion')
    }

}

const prepareImage = (images: string[]) => {
    return images.map(
        image => image.split("/").pop()
    )
}

const createProduct = async (product: Partial<Producto>): Promise<Producto> => {

    const { id, images = [], ...rest } = product

    try {
        const checkedImages = prepareImage(images)
        const { data } = await tesloApi.post(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error)) {
            console.log(error.request?.data)
        }
        throw new Error('Error en la actualizacion')
    }

}