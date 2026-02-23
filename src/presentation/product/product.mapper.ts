import { ProductResponseDto } from "./dto/product-response.dto";

export default function toResponseDto(product: any): ProductResponseDto {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
    };
}