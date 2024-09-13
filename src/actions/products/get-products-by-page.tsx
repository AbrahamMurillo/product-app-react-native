import { tesloApi } from "../../config/api/tesloApi"
import { Producto } from "../../domain/entities/product"
import type { TesloProducto } from "../../infraestructure/interfaces/teslo-products.response"
import { ProductMapper } from "../../infraestructure/mapper/product.mapper"

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Producto[]> => {
    try {
        const { data } = await tesloApi.get<TesloProducto[]>(`/products?offset=${page * 10}&limit=${limit}`)
        const products = data.map(ProductMapper.tesloProductToEntity)
        return products

    } catch (error) {
        console.log(error)
        throw new Error(`Error ${error}`)
    }
}