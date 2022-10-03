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
exports.ComplaintController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
const complaint_service_1 = require("./complaint.service");
let ComplaintController = class ComplaintController {
    constructor(complaintService) {
        this.complaintService = complaintService;
    }
    create() {
        return this.complaintService.create();
    }
    findAll() {
        return this.complaintService.findAll();
    }
    findOne(id) {
        return this.complaintService.findOne(+id);
    }
    update(id) {
        return this.complaintService.update(+id);
    }
    remove(id) {
        return this.complaintService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "remove", null);
ComplaintController = __decorate([
    (0, swagger_1.ApiTags)('complaints'),
    (0, common_1.Controller)('complaint'),
    __metadata("design:paramtypes", [complaint_service_1.ComplaintService])
], ComplaintController);
exports.ComplaintController = ComplaintController;
//# sourceMappingURL=complaint.controller.js.map