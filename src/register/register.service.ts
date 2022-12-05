import { Injectable, Redirect } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "src/entities/user.entity";
global.crypto = require('crypto')


@Injectable()
export class RegisterService {

    async _SHA256_hash(text: string): Promise<string> {
        const utf8 = new TextEncoder().encode(text)
        return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray
                .map((bytes) => bytes.toString(16).padStart(2, '0'))
                .join('')
            return hashHex
        })
    }

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    // async registerUser(dto: UserDto): {
    async registerUser(dto: UserDto): Promise<User | Object> {
        let email: string = dto.email
        let password: string = dto.password
        
        // if (typeof email == undefined) {
        //     return {
        //         errName: 'parameter_transfer_registration',
        //         message: 'Ошибка. параметр `email` не передан'
        //     }
        // }

        // if (typeof password == undefined) {
        //     return {
        //         errName: 'parameter_transfer_registration',
        //         message: 'Ошибка. Параметр `password` не передан'
        //     }
        // }

        // привести email к нижнему регистру
        email = email.toLowerCase()
        
        // валидация email: наличие символов '@', '.com', '.ru'? + пустота данных
        const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const validateEmail = regexpEmail.test(email)

        if (!validateEmail)
        {
            return {
                errName: 'incorrect_email_registration',
                message: 'Некорректный Email (регистрация)'
            }
        }

        // валидация пароля: пустота данных + длина менее 6 символов или более 32
        if (
            password == '' ||
            password.length < 6 ||
            password.length > 32
        ) {
            return {
                errName: 'incorrect_password_registration',
                message: 'Некорректный Пароль (регистрация)'
            }
        }
        

        // проверить: есть ли пользователь с таким Email?
        // получаем пользователя, у которого email == email
        return await this.usersRepository.find({
            where: {
                email: email
            }
        })
        .then(async (users) => {
            // если нашелся пользователь с таким email
            if (users.length > 0) {
                return { 
                    errName: 'user_already_exist',
                    message: 'Пользователь с таким Email уже существует'
                }
            }
            // если пользователь в БД не нашелся >>>
            else {
                // хешируем пароль
                password = await this._SHA256_hash(password)

                // голый пароль в DTO заменяем на хешированный
                dto.password = password

                // созадем пользователя в БД, при этом создаем id пользователя
                const updatedDto = {
                    id: Date.now().toString(),
                    ...dto
                }
                const newUser = this.usersRepository.create(updatedDto)
                return await this.usersRepository.save(newUser)
            }
        })
    }
}