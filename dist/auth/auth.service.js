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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const users_service_1 = require("../users/users.service");
const email_1 = require("../shared/email");
const mail_1 = require("../shared/mail");
const role_enum_1 = require("../enums/role.enum");
const gen = () => {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(6)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
};
const err = (message) => {
    throw new Error(message);
};
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        if (!(await (0, argon2_1.verify)((await this.usersService.getPassword(user.id)).password, pass)))
            throw new common_1.HttpException('Password is not correct', common_1.HttpStatus.FAILED_DEPENDENCY);
        return user;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
            user_id: payload.sub,
            roles: payload.roles,
            email: payload.email,
            fullName: user.fullName,
            name: user.name,
        };
    }
    async register(object) {
        const { fullName, password } = object;
        const email = (0, email_1.cleanEmail)(object.email);
        try {
            if (!(0, email_1.validateEmail)(email))
                err('Email is invalid');
            if (password.length < 6)
                err('Password is less than 6 characters');
            const user = await this.usersService.create({
                email,
                fullName,
                password,
            });
            await this.processUser(user, email).catch((err) => {
                throw new Error(err.message);
            });
            return `User ${user.id} created successfully. Check email for verification token.`;
        }
        catch (error) {
            if (error.message.startsWith('E11000')) {
                throw new common_1.HttpException('An account with this email already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async processUser(user, email) {
        const token = gen();
        if (await (0, mail_1.sendEmail)(email, token)) {
            const signed = this.jwtService.sign({ token }, {
                expiresIn: '5m',
            });
            await this.usersService
                .update(user.id, { token: signed })
                .catch((err) => {
                throw new Error(err.message);
            });
        }
    }
    async registerSeller(object) {
        const { fullName, password } = object;
        const email = (0, email_1.cleanEmail)(object.email);
        try {
            if (!(0, email_1.validateEmail)(email))
                err('Email is invalid');
            if (password.length < 6)
                err('Password less than 6 characters');
            const user = await this.usersService.createSeller({
                email,
                fullName,
                password,
            });
            await this.processUser(user, email).catch((err) => {
                throw new Error(err.message);
            });
            return `User ${user.id} created successfully. Check email for verification token.`;
        }
        catch (error) {
            if (error.message.startsWith('E11000')) {
                throw new common_1.HttpException('An account with this email already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verify(object) {
        const plainToken = object.token;
        const email = (0, email_1.cleanEmail)(object.email);
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                err('No user found with that email');
            }
            if (user.verified) {
                err('User already verified');
            }
            const token = await this.jwtService.verify(user.token).token;
            if (token !== (0, email_1.cleanEmail)(plainToken))
                err('Token is invalid');
            await this.usersService.update(user.id, {
                verified: true,
                active: !user.roles.includes(role_enum_1.Role.Seller),
            });
            return 'Verified successfully';
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resend(object) {
        const old_email = (0, email_1.cleanEmail)(object.old_email);
        const new_email = (0, email_1.cleanEmail)(object.new_email);
        try {
            if (!(0, email_1.validateEmail)(new_email))
                err(`${new_email} is invalid`);
            const user = await this.usersService.findByEmail(old_email);
            if (!user) {
                err('No user found with that email');
            }
            if (user.verified) {
                err('User already verified');
            }
            const token = gen();
            await this.usersService
                .update(user.id, {
                email: new_email,
            })
                .catch((err) => {
                throw new Error(err.message);
            });
            if (await (0, mail_1.sendEmail)(new_email, token)) {
                const signed = this.jwtService.sign({ token }, {
                    expiresIn: '5m',
                });
                await this.usersService
                    .update(user.id, { token: signed })
                    .catch((err) => {
                    throw new Error(err.message);
                });
            }
            return 'Verification token sent successfully';
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map