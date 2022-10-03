export declare class CreateProductDto {
    name: string;
    description: string;
    image: string[];
    price: number;
    category: string;
}
export declare class MultipleCreateProductDto {
    products: CreateProductDto[];
}
