import { Module } from '@nestjs/common';
import { ColourService } from './colour.service';
import { ColourController } from './colour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Colour, ColourSchema } from './schemas/colour.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Colour.name, schema: ColourSchema }]),
  ],
  controllers: [ColourController],
  providers: [ColourService],
})
export class ColourModule {}
