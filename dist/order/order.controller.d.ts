import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string): string;
    remove(id: string): string;
}
