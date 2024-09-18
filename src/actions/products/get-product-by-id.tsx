import { tesloApi } from "../../config/api/tesloApi"
import { Gender, Producto } from "../../domain/entities/product"
import { TesloProducto } from "../../infraestructure/interfaces/teslo-products.response"
import { ProductMapper } from "../../infraestructure/mapper/product.mapper"

const emptyProduct: Producto = {
    id: "",
    title: "Nuevo Producto",
    price: 0,
    description: "",
    slug: "",
    stock: 0,
    sizes: [],
    gender: Gender.Unisex,
    tags: [],
    images: []
}

export const getProductById = async (id: string): Promise<Producto> => {
    if (id === 'new') return emptyProduct

    try {
        const { data } = await tesloApi.get<TesloProducto>(`/products/${id}`)
        return ProductMapper.tesloProductToEntity(data)
    } catch (error) {
        console.log(error)
        throw new Error('Error getting product')
    }
}