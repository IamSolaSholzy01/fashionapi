import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ColourService } from './colour.service';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';

@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

  @Post()
  create(@Body() createColourDto: CreateColourDto) {
    return this.colourService.create(createColourDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.colourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColourDto: UpdateColourDto) {
    return this.colourService.update(+id, updateColourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colourService.remove(+id);
  }
}
