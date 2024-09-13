import { API_URL } from "@env";
import type { Producto } from "../../domain/entities/product";
import type { TesloProducto } from "../interfaces/teslo-products.response";

export class ProductMapper {
    static tesloProductToEntity(tesloProduct: TesloProducto): Producto {
        return {
            id: tesloProduct.id,
            title: tesloProduct.title,
            price: tesloProduct.price,
            description: tesloProduct.description,
            slug: tesloProduct.slug,
            stock: tesloProduct.stock,
            sizes: tesloProduct.sizes,
            gender: tesloProduct.gender,
            tags: tesloProduct.tags,
            images: tesloProduct.images.map(
                img => `${API_URL}/files/product/${img}`
            )
        }
    }
}