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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const argon2_1 = require("argon2");
const mongoose_2 = require("mongoose");
const role_enum_1 = require("../enums/role.enum");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createSeller(createSellerDto) {
        const { email, password, fullName } = createSellerDto;
        const roles = [role_enum_1.Role.Seller];
        try {
            const hashed = await (0, argon2_1.hash)(password);
            return await this.userModel.create({
                email,
                password: hashed,
                fullName,
                roles,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(createUserDto) {
        const { email, password, fullName } = createUserDto;
        try {
            const hashed = await (0, argon2_1.hash)(password);
            return await this.userModel.create({
                email,
                password: hashed,
                fullName,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return this.userModel.find().select('-password').exec();
    }
    async findOne(id) {
        return await this.userModel.findById(id).select('-password').exec();
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email }).select('-password').exec();
    }
    async getPassword(id) {
        return await this.userModel.findById(id).select('password').exec();
    }
    async update(id, updateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    async addReview(id, review) {
        return await this.userModel.findByIdAndUpdate(id, {
            $push: { review: review },
        });
    }
    async countAdmins() {
        return await this.userModel.countDocuments({
            roles: role_enum_1.Role.Admin,
        });
    }
    async promoteToAdmin(id) {
        return await this.userModel.findByIdAndUpdate(id, {
            $push: { roles: role_enum_1.Role.Admin },
        });
    }
    async countSellers() {
        return await this.userModel.countDocuments({
            roles: role_enum_1.Role.Seller,
        });
    }
    async remove(id) {
        return await this.userModel.findByIdAndDelete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map