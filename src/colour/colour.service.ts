import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';
import { Colour, ColourDocument } from './schemas/colour.schema';

@Injectable()
export class ColourService {
  constructor(
    @InjectModel(Colour.name) private colourModel: Model<ColourDocument>,
  ) {}

  async create(createColourDto: CreateColourDto) {
    return await this.colourModel.create(createColourDto);
  }

  async findAll() {
    return await this.colourModel.find().exec();
  }

  async findOne(id: mongoose.Types.ObjectId) {
    return this.colourModel.findById(id);
  }

  async update(id: mongoose.Types.ObjectId, updateColourDto: UpdateColourDto) {
    return await this.colourModel.findByIdAndUpdate(id, updateColourDto);
  }

  async remove(id: mongoose.Types.ObjectId) {
    return await this.colourModel.findByIdAndDelete(id);
  }
}
