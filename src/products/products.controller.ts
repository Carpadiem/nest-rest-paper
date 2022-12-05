import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAll() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.getProduct(id)
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() productEntity: ProductEntity) {
        return this.productsService.updateProduct(productEntity)
    }

    // @Get()
    // getAll() {
    //     return this.productsService.getAll()
    // }

    // @Get(':id')
    // getOne(@Param('id') id: string) {
    //     return this.productsService.getOne(id)
    // }

    // @Post()
    // create(@Body() createProductDto: CreateProductDto) {
    //     return this.productsService.create(createProductDto)
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    //     return this.productsService.update(id, updateProductDto)
    // }
}
