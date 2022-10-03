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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const product_review_schema_1 = require("./schemas/product-review.schema");
const review_schema_1 = require("./schemas/review.schema");
let ReviewService = class ReviewService {
    constructor(reviewModel, usersService) {
        this.reviewModel = reviewModel;
        this.usersService = usersService;
    }
    async create(createReviewDto, user) {
        try {
            const author = await this.usersService.findOne(user.id);
            const { product, seller } = createReviewDto, reviewObj = __rest(createReviewDto, ["product", "seller"]);
            const existing = await this.reviewModel.find({
                author: new mongoose_2.default.Types.ObjectId(author.id),
                product: new mongoose_2.default.Types.ObjectId(product),
            });
            if (existing.length)
                throw new Error('You have already reviewed this product');
            const review = await this.reviewModel.create(Object.assign(Object.assign({}, reviewObj), { product,
                seller,
                author }));
            await this.usersService.addReview(author.id, review.id);
            return review;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return await this.reviewModel.find().populate('author', 'name').exec();
    }
    async findAllForProduct(product) {
        return await this.reviewModel
            .find({
            product: new mongoose_2.default.Types.ObjectId(product),
        })
            .exec();
    }
    async findOne(id) {
        return await this.reviewModel.findById(id).exec();
    }
    async update(id, updateReviewDto) {
        return this.reviewModel.findByIdAndUpdate(id, updateReviewDto);
    }
    async remove(id) {
        return this.reviewModel.findByIdAndDelete(id);
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_review_schema_1.ProductReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map