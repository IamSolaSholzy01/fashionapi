"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColourModule = void 0;
const common_1 = require("@nestjs/common");
const colour_service_1 = require("./colour.service");
const colour_controller_1 = require("./colour.controller");
const mongoose_1 = require("@nestjs/mongoose");
const colour_schema_1 = require("./schemas/colour.schema");
let ColourModule = class ColourModule {
};
ColourModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: colour_schema_1.Colour.name, schema: colour_schema_1.ColourSchema }]),
        ],
        controllers: [colour_controller_1.ColourController],
        providers: [colour_service_1.ColourService],
    })
], ColourModule);
exports.ColourModule = ColourModule;
//# sourceMappingURL=colour.module.js.map