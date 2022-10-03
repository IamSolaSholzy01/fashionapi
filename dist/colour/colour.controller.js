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
exports.ColourController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const public_decorator_1 = require("../decorators/public.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
const colour_service_1 = require("./colour.service");
const create_colour_dto_1 = require("./dto/create-colour.dto");
const update_colour_dto_1 = require("./dto/update-colour.dto");
let ColourController = class ColourController {
    constructor(colourService) {
        this.colourService = colourService;
    }
    create(createColourDto) {
        return this.colourService.create(createColourDto);
    }
    findAll() {
        return this.colourService.findAll();
    }
    findOne(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.colourService.findOne(id);
    }
    update(id, updateColourDto) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.colourService.update(id, updateColourDto);
    }
    remove(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new common_1.HttpException('Invalid Object Id', common_1.HttpStatus.FORBIDDEN);
        return this.colourService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_colour_dto_1.CreateColourDto]),
    __metadata("design:returntype", void 0)
], ColourController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColourController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColourController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_colour_dto_1.UpdateColourDto]),
    __metadata("design:returntype", void 0)
], ColourController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColourController.prototype, "remove", null);
ColourController = __decorate([
    (0, swagger_1.ApiTags)('colours'),
    (0, common_1.Controller)('colour'),
    __metadata("design:paramtypes", [colour_service_1.ColourService])
], ColourController);
exports.ColourController = ColourController;
//# sourceMappingURL=colour.controller.js.map