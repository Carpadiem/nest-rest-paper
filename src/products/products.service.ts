import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    private products = []

    getAll() {
        return this.products
    }

    getOne(id: string) {
        return this.products.find(p => p.id === id)
    }

    create(createProductDto: CreateProductDto) {
        this.products.push(createProductDto)
        return 'Created!'
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        const product = this.products.find(p => p.id === id)
        product.id = id
        product.price = updateProductDto.price

        this.products.filter(p => p.id != id)
        return 'Updated!'
    }
}
