import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get('/users')
    async getAllUsers() {
        return await this.adminService.getAllUsers()
    }
    
    @Get('/users/getUserById/:id')
    async getUserById(@Param('id') id: string) {
        return await this.adminService.getUserById(id)
    }

    @Get('/users/getUserByEmail/:email')
    async getUserByEmail(@Param('email') email: string) {
        return await this.adminService.getUserByEmail(email)
    }
}
