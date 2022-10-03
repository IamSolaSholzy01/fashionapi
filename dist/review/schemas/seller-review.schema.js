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
exports.SellerReviewSchema = exports.SellerReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
let SellerReview = class SellerReview {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], SellerReview.prototype, "seller", void 0);
SellerReview = __decorate([
    (0, mongoose_1.Schema)()
], SellerReview);
exports.SellerReview = SellerReview;
exports.SellerReviewSchema = mongoose_1.SchemaFactory.createForClass(SellerReview);
//# sourceMappingURL=seller-review.schema.js.map