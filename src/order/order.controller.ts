import { Controller, Get, Query, UseGuards, UseInterceptors, ClassSerializerInterceptor, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import {Response} from 'express'
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService){
        
    }

    @Get('orders')
    async all(@Query('page') page = 1){
        // return this.orderService.all(['order_items']);
        return this.orderService.paginate(page, ['order_items']);
    }

    @Post('export')
    async export(@Res() res: Response) {
        
    }
}
