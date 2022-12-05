
import { Entity, Column } from "typeorm";

@Entity()
export class ProductEntity {

    @Column({length: 30})
    id: string

    @Column()
    name: string

    @Column()
    price: number

}
