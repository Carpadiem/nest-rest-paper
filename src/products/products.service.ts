import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>) {}

    async getProducts(): Promise<ProductEntity[]> {
        return await this.productsRepository.find()
    }

    async getProduct(id: string): Promise<ProductEntity[]> {
        return await this.productsRepository.find({
            select: ['id', 'name', 'price'],
            where: [{'id': id}]
        })
    }

    async createProduct(dto: CreateProductDto) {
        this.productsRepository.create({
            ...dto
        })
    }

    async updateProduct(product: ProductEntity) {
        this.productsRepository.save(product)
    }

    // private products = []

    // getAll() {
    //     return this.products
    // }

    // getOne(id: string) {
    //     return this.products.find(p => p.id === id)
    // }

    // create(createProductDto: CreateProductDto) {
    //     this.products.push(createProductDto)
    //     return 'Created!'
    // }

    // update(id: string, updateProductDto: UpdateProductDto) {
    //     const product = this.products.find(p => p.id === id)
    //     product.id = id
    //     product.name = updateProductDto.name
    //     product.price = updateProductDto.price

    //     this.products.filter(p => p.id != id)
    //     return 'Updated!'
    // }
}
