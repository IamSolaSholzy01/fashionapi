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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    create(req, createReviewDto) {
        return this.reviewService.create(createReviewDto, req.user);
    }
    findAll() {
        return this.reviewService.findAll();
    }
    findOne(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.reviewService.findOne(id);
    }
    update(id, updateReviewDto) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.reviewService.update(id, updateReviewDto);
    }
    remove(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.reviewService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "remove", null);
ReviewController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map