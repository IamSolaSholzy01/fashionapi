import { ComplaintService } from './complaint.service';
export declare class ComplaintController {
    private readonly complaintService;
    constructor(complaintService: ComplaintService);
    create(): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string): string;
    remove(id: string): string;
}
