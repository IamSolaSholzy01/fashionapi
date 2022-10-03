"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColourDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_colour_dto_1 = require("./create-colour.dto");
class UpdateColourDto extends (0, swagger_1.PartialType)(create_colour_dto_1.CreateColourDto) {
}
exports.UpdateColourDto = UpdateColourDto;
//# sourceMappingURL=update-colour.dto.js.map