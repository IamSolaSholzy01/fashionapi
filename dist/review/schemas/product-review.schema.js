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
exports.ProductReviewSchema = exports.ProductReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../../products/schemas/product.schema");
let ProductReview = class ProductReview {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: product_schema_1.Product.name,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => product_schema_1.Product),
    __metadata("design:type", product_schema_1.Product)
], ProductReview.prototype, "product", void 0);
ProductReview = __decorate([
    (0, mongoose_1.Schema)()
], ProductReview);
exports.ProductReview = ProductReview;
exports.ProductReviewSchema = mongoose_1.SchemaFactory.createForClass(ProductReview);
//# sourceMappingURL=product-review.schema.js.map