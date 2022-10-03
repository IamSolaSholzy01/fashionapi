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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../decorators/public.decorator");
const auth_service_1 = require("./auth.service");
const registerdto_1 = require("./dto/registerdto");
const tokendto_1 = require("./dto/tokendto");
const local_auth_guard_1 = require("./local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async registerSeller(registerDto) {
        return this.authService.registerSeller(registerDto);
    }
    async verify(tokenDto) {
        return this.authService.verify(tokenDto);
    }
    async resend(tokenDto) {
        return this.authService.resend(tokenDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    description: 'User email',
                    example: 'test@test.com',
                },
                password: {
                    type: 'string',
                    description: 'User password',
                },
            },
        },
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerdto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/register/seller'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerdto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerSeller", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokendto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/resend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokendto_1.ResendDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resend", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map