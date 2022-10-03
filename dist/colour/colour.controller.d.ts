import mongoose from 'mongoose';
import { ColourService } from './colour.service';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';
export declare class ColourController {
    private readonly colourService;
    constructor(colourService: ColourService);
    create(createColourDto: CreateColourDto): Promise<import("./schemas/colour.schema").Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<(import("./schemas/colour.schema").Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("./schemas/colour.schema").Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateColourDto: UpdateColourDto): Promise<import("./schemas/colour.schema").Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<import("./schemas/colour.schema").Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
