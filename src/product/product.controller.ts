import { Controller, Query, Get, UseGuards, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private peoductService: ProductService) {

    }

    @Get()
    async all(@Query('page') page = 1){
        return this.peoductService.paginate();
    
    }

    @Post()
    async create(@Body() body: ProductCreateDto){
        return this.peoductService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.peoductService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number, 
        @Body() body: ProductUpdateDto
        ){
            await this.peoductService.update(id, body);

            return this.peoductService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return this.peoductService.delete(id);
    }
}
