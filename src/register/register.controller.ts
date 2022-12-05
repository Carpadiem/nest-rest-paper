import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { UserDto } from "./dto/user.dto";

@Controller('register')
export class RegisterController {

    constructor(private readonly registerService: RegisterService) {}

    // открывается страница регистрации
    @Get()
    getRegisterPage() {
        return {
            'statusCode': 200,
            'message': 'Founded. [Register Page]'
        }
    }

    // попытка создать нового пользователя с помощью тела запроса
    @Post()
    async registerUser(@Body() dto: UserDto) {
        return await this.registerService.registerUser(dto)
    }
}