import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ColourService } from './colour.service';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';

@ApiTags('colours')
@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post()
  create(@Body() createColourDto: CreateColourDto) {
    return this.colourService.create(createColourDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.colourService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.colourService.findOne(id as unknown as mongoose.Types.ObjectId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColourDto: UpdateColourDto) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.colourService.update(
      id as unknown as mongoose.Types.ObjectId,
      updateColourDto,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new HttpException('Invalid Object Id', HttpStatus.FORBIDDEN);
    return this.colourService.remove(id as unknown as mongoose.Types.ObjectId);
  }
}
