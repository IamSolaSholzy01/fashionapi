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
exports.ReviewSchema = exports.Review = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const product_review_schema_1 = require("./product-review.schema");
const seller_review_schema_1 = require("./seller-review.schema");
let Review = class Review {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Review.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, max: 10, min: 0 }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Review.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [product_review_schema_1.ProductReview.name, seller_review_schema_1.SellerReview.name],
        required: true,
        default: product_review_schema_1.ProductReview.name,
    }),
    __metadata("design:type", String)
], Review.prototype, "category", void 0);
Review = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, discriminatorKey: 'category' })
], Review);
exports.Review = Review;
exports.ReviewSchema = mongoose_1.SchemaFactory.createForClass(Review);
exports.ReviewSchema.virtual('id').get(function () {
    return this._id;
});
//# sourceMappingURL=review.schema.js.map