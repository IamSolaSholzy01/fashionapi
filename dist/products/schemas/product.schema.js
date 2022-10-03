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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Product.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "onDiscount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "featured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Product.prototype, "seller", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.virtual('id').get(function () {
    return this._id;
});
exports.ProductSchema.virtual('rating').get(function () {
    let sum = 0;
    this.reviews.forEach((rev) => (sum += rev));
    return sum / this.reviews.length;
});
//# sourceMappingURL=product.schema.js.map