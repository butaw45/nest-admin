import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from 'src/common/paginated-result.interface';

@Injectable()
export class OrderService extends AbstractService{
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ){
        super(orderRepository);
    }

    async paginate(page = 1, relations = []): Promise<PaginatedResult>{
        const {data, meta} = await super.paginate(page,relations);
        return{
            data: data.map((order: Order) => ({
                // ? paginate dengan tidak return password
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total, 
                create_at: order.create_at,
                order_items: order.order_items
            })),
            meta
        }
    }
}
