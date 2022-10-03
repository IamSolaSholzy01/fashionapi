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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_service_1 = require("../review/review.service");
const users_service_1 = require("../users/users.service");
const product_schema_1 = require("./schemas/product.schema");
let ProductsService = class ProductsService {
    constructor(productModel, reviewService, userService) {
        this.productModel = productModel;
        this.reviewService = reviewService;
        this.userService = userService;
    }
    async create(createProductDto, user) {
        const seller = await this.userService.findOne(user.id);
        if (createProductDto.image.length > 5)
            throw new common_1.HttpException('Maximum of 5 images allowed', common_1.HttpStatus.FORBIDDEN);
        return await this.productModel
            .create(Object.assign(Object.assign({}, createProductDto), { seller }))
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createMultiple(createBulkProductDto, user) {
        const res = [];
        for (const product of createBulkProductDto.products) {
            await this.create(product, user).then((r) => res.push(r));
        }
        return res;
    }
    async findAll() {
        return await this.productModel.find().exec();
    }
    async findCategories() {
        const product_categories = (await this.productModel.find().select('category -_id').exec()).map(({ category }) => {
            return category;
        });
        return [...new Set(product_categories)];
    }
    async findByCategory(category) {
        return await this.productModel
            .find({
            category,
        })
            .exec();
    }
    async findOne(id) {
        return this.productModel.findById(id);
    }
    async findRating(id) {
        const reviews = await this.reviewService.findAllForProduct(id);
        console.log(id);
        let sum = 0;
        reviews.forEach(({ rating }) => (sum += rating));
        return sum / reviews.length;
    }
    async findDiscount() {
        return this.productModel.find({
            onDiscount: true,
        });
    }
    async findFeatured() {
        return this.productModel.find({
            featured: true,
        });
    }
    async update(id, updateProductDto) {
        var _a, _b;
        const product = await this.productModel.findById(id);
        if (((_a = updateProductDto === null || updateProductDto === void 0 ? void 0 : updateProductDto.image) === null || _a === void 0 ? void 0 : _a.length) + ((_b = product === null || product === void 0 ? void 0 : product.image) === null || _b === void 0 ? void 0 : _b.length) > 5)
            throw new common_1.HttpException('Maximum of 5 images allowed', common_1.HttpStatus.FORBIDDEN);
        return this.productModel.findByIdAndUpdate(id, updateProductDto);
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id);
    }
    async review(id, user, reviewProductDto) {
        return await this.reviewService.create(Object.assign(Object.assign({}, reviewProductDto), { product: id.toString() }), user);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        review_service_1.ReviewService,
        users_service_1.UsersService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map