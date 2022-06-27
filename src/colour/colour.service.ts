import { Injectable } from '@nestjs/common';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';

@Injectable()
export class ColourService {
  create(createColourDto: CreateColourDto) {
    return 'This action adds a new colour';
  }

  findAll() {
    return `This action returns all colour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colour`;
  }

  update(id: number, updateColourDto: UpdateColourDto) {
    return `This action updates a #${id} colour`;
  }

  remove(id: number) {
    return `This action removes a #${id} colour`;
  }
}
