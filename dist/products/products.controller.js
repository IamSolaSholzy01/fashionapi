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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../decorators/public.decorator");
const role_enum_1 = require("../enums/role.enum");
const roles_decorator_1 = require("../decorators/roles.decorator");
const mongoose_1 = require("mongoose");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(req, createProductDto) {
        return await this.productsService.create(createProductDto, req.user);
    }
    async createBulk(req, createBulkProductDto) {
        return await this.productsService.createMultiple(createBulkProductDto, req.user);
    }
    findAll() {
        return this.productsService.findAll();
    }
    findAllCategories() {
        return this.productsService.findCategories();
    }
    findByCategory(category) {
        return this.productsService.findByCategory(category);
    }
    findRating(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.productsService.findRating(id);
    }
    findDiscount() {
        return this.productsService.findDiscount();
    }
    findFeatured() {
        return this.productsService.findFeatured();
    }
    findOne(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.productsService.update(id, updateProductDto);
    }
    remove(req, id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.productsService.remove(id);
    }
    review(req, id, reviewProductDto) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.productsService.review(id, req.user, reviewProductDto);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Seller, role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Seller, role_enum_1.Role.Admin),
    (0, common_1.Post)('/bulk/create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.MultipleCreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createBulk", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAllCategories", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findByCategory", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('rating/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findRating", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('discount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findDiscount", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findFeatured", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Seller),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Seller, role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Seller, role_enum_1.Role.Admin),
    (0, common_1.Post)('/review/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.ReviewProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "review", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map