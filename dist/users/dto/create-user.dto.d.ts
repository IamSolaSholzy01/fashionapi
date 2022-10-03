export declare class CreateUserDto {
    email: string;
    password: string;
    fullName: string;
}
export declare class CreateSellerDto extends CreateUserDto {
    constructor();
    roles?: string[];
}
