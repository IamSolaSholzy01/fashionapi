"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewProductDto = exports.UpdateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_review_dto_1 = require("../../review/dto/create-review.dto");
const product_review_schema_1 = require("../../review/schemas/product-review.schema");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDto extends (0, swagger_1.PartialType)(create_product_dto_1.CreateProductDto) {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "onDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "discount", void 0);
exports.UpdateProductDto = UpdateProductDto;
class ReviewProductDto extends (0, swagger_1.OmitType)(create_review_dto_1.CreateReviewDto, [
    'category',
    'product',
    'seller',
]) {
    constructor() {
        super();
        this.category = product_review_schema_1.ProductReview.name;
    }
}
exports.ReviewProductDto = ReviewProductDto;
//# sourceMappingURL=update-product.dto.js.map