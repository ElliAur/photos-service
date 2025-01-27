import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({summary: 'Create a new User and Profile (Optional)'})
    @ApiCreatedResponse({
        description: "The User has veen created successfully",
        type: User
    })
    @UseGuards(JwtAuthGuard)
    async createUser(@Body()createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUser(createUserDto);
    }
    @Get()
    @ApiOperation({summary: "Get all Users"})
    @ApiResponse({status: 200, description: 'ok'})
    @UseGuards(JwtAuthGuard)
    async getUsers(): Promise<User[]> {
        return await this.usersService.findUsers();
    }
    @Get(':id')
    @ApiOperation({summary: "Get a single User"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching user id'})
    @UseGuards(JwtAuthGuard)
    async getUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.findUserById(id);
    }
    @Patch(':id')
    @ApiOperation({summary: "Update a User"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching user id'})
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto);
    }
    @Delete(':id')
    @ApiOperation({summary: "Delete a User"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching user id'})
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string): Promise<void> {
        return await this.usersService.deleteUser(id);
    }
    
}
