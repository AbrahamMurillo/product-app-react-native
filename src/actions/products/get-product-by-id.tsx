import { tesloApi } from "../../config/api/tesloApi"
import { Producto } from "../../domain/entities/product"
import { TesloProducto } from "../../infraestructure/interfaces/teslo-products.response"
import { ProductMapper } from "../../infraestructure/mapper/product.mapper"

export const getProductById = async (id: string): Promise<Producto> => {
    try {
        const { data } = await tesloApi.get<TesloProducto>(`/products/${id}`)
        return ProductMapper.tesloProductToEntity(data)
    } catch (error) {
        console.log(error)
        throw new Error('Error getting product')
    }
}