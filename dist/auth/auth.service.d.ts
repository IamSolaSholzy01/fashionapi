/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/registerdto';
import { ResendDto, TokenDto } from './dto/tokendto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user_id: import("mongoose").Types.ObjectId;
        roles: string[];
        email: string;
        fullName: string;
        name: Record<string, any>;
    }>;
    register(object: RegisterDto): Promise<string>;
    processUser(user: User, email: string): Promise<void>;
    registerSeller(object: RegisterDto): Promise<string>;
    verify(object: TokenDto): Promise<string>;
    resend(object: ResendDto): Promise<string>;
}
