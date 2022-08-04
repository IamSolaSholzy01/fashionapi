import { Injectable } from '@nestjs/common';
// import { CreateComplaintDto } from './dto/create-complaint.dto';
// import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintService {
  // createComplaintDto: CreateComplaintDto
  create() {
    return 'This action adds a new complaint';
  }

  findAll() {
    return `This action returns all complaint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaint`;
  }
  // updateComplaintDto: UpdateComplaintDto
  update(id: number) {
    return `This action updates a #${id} complaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}
