import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryColumn()
    id: string

    @Column({type: 'varchar', length: 45})
    email: string

    @Column({type: 'varchar', length: 64})
    password: string

}