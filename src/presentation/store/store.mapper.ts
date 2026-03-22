import { StoreResponseDto } from "./dto/store-response.dto";

export default function toResponseDto(store: any): StoreResponseDto {
    return {
        id: store.id,
        name: store.name,
        address: store.address,
        phone: store.phone,
    };
}