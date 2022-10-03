import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    constructor();
    reviews?: number[];
    onDiscount?: boolean;
    discount?: number;
}
declare const ReviewProductDto_base: import("@nestjs/common").Type<Omit<CreateReviewDto, "category" | "product" | "seller">>;
export declare class ReviewProductDto extends ReviewProductDto_base {
    constructor();
    category: string;
}
export {};
