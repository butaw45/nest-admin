import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.order_items )
    @JoinColumn({name: 'order_id'})
    order: Order;
}