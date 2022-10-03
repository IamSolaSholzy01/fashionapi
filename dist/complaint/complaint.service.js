"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintService = void 0;
const common_1 = require("@nestjs/common");
let ComplaintService = class ComplaintService {
    create() {
        return 'This action adds a new complaint';
    }
    findAll() {
        return `This action returns all complaint`;
    }
    findOne(id) {
        return `This action returns a #${id} complaint`;
    }
    update(id) {
        return `This action updates a #${id} complaint`;
    }
    remove(id) {
        return `This action removes a #${id} complaint`;
    }
};
ComplaintService = __decorate([
    (0, common_1.Injectable)()
], ComplaintService);
exports.ComplaintService = ComplaintService;
//# sourceMappingURL=complaint.service.js.map