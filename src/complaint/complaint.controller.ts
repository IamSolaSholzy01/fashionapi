import {
  Controller,
  Get,
  Post,
  // Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ComplaintService } from './complaint.service';
// import { CreateComplaintDto } from './dto/create-complaint.dto';
// import { UpdateComplaintDto } from './dto/update-complaint.dto';

@ApiTags('complaints')
@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @ApiBearerAuth()
  @Post()
  // @Body() createComplaintDto: CreateComplaintDto
  create() {
    return this.complaintService.create();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.complaintService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  // @Body() updateComplaintDto: UpdateComplaintDto,
  update(@Param('id') id: string) {
    return this.complaintService.update(+id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintService.remove(+id);
  }
}
