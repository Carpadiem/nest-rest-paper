import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {

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

    async authUser(dto: AuthUserDto): Promise<User | Object> {
        let email = dto.email
        let password = dto.password

        // if (typeof email == undefined) {
        //     return {
        //         errName: 'parameter_transfer_auth',
        //         message: 'Ошибка. параметр `email` не передан'
        //     }
        // }

        // if (typeof password == undefined) {
        //     return {
        //         errName: 'parameter_transfer_auth',
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
                errName: 'incorrect_email_auth',
                message: 'Некорректный Email (авторизация)'
            }
        }

        // валидация пароля: пустота данных + длина менее 6 символов или более 32
        if (
            password == '' ||
            password.length < 6 ||
            password.length > 32
        ) {
            return {
                errName: 'incorrect_password_auth',
                message: 'Некорректный Пароль (авторизация)'
            }
        }

        // проверка: есть ли пользователь с таким email?
        return await this.usersRepository.find({
            where: {
                email: email
            }
        })
        .then(async (users) => {
            // пльзователя не существует
            if (users.length <= 0) {
                return {
                    errName: 'user_by_email_not_exist',
                    message: 'Пользователя с таким Email не существует'
                }
            }
            // нашелся
            else {
                const user = users[0]
                // хешируем пароль из DTO и сравниваем с паролем из users

                const hashedPassword = await this._SHA256_hash(password)
                
                // не совпадают
                if (hashedPassword != user.password) {
                    return {
                        errName: 'password_mismatch_auth',
                        message: 'Неверный пароль'
                    }
                }
                else {
                    return {
                        message: 'Успешный вход',
                        ...user
                    }
                }
            }
        })
    }

}
