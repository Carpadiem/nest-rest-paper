import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    async authUser(@Body() dto: AuthUserDto) {
        return await this.authService.authUser(dto)
    }
    
}
