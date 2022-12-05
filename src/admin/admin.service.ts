import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async getUserById(id: string) {
        return await this.userRepository.find({
            where: {
                id: id
            }
        })
        .then((users) => {
            if (users.length == 0) {
                return {
                    errName: 'user_not_found',
                    message: 'Пользователь по такому ID не найден'
                }
            }
            else {
                // return users.filter(u => u.id === id)
                return {
                    message: 'Пользователь найден',
                    user: users[0]
                }
            }
        })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.find({
            where: {
                email: email
            }
        })
        .then((users) => {
            if (users.length == 0) {
                return {
                    errName: 'user_not_found',
                    message: 'Пользователь по такому Email не найден '
                }
            }
            else {
                return {
                    message: 'Пользователь найден',
                    user: users[0]
                }
            }
        })
    }
}
