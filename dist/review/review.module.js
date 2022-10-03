"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const review_controller_1 = require("./review.controller");
const mongoose_1 = require("@nestjs/mongoose");
const review_schema_1 = require("./schemas/review.schema");
const users_module_1 = require("../users/users.module");
const product_review_schema_1 = require("./schemas/product-review.schema");
const seller_review_schema_1 = require("./schemas/seller-review.schema");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: review_schema_1.Review.name,
                    schema: review_schema_1.ReviewSchema,
                    discriminators: [
                        { name: product_review_schema_1.ProductReview.name, schema: product_review_schema_1.ProductReviewSchema },
                        { name: seller_review_schema_1.SellerReview.name, schema: seller_review_schema_1.SellerReviewSchema },
                    ],
                },
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
        exports: [review_service_1.ReviewService],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map