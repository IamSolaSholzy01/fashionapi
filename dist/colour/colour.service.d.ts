import mongoose, { Model } from 'mongoose';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';
import { Colour, ColourDocument } from './schemas/colour.schema';
export declare class ColourService {
    private colourModel;
    constructor(colourModel: Model<ColourDocument>);
    create(createColourDto: CreateColourDto): Promise<Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<(Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: mongoose.Types.ObjectId): Promise<Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: mongoose.Types.ObjectId, updateColourDto: UpdateColourDto): Promise<Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: mongoose.Types.ObjectId): Promise<Colour & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
