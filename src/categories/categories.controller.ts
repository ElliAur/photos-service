import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({summary: 'Create a new Category'})
    @ApiCreatedResponse({
        description: "The Category has been created successfully",
        type: Category
    })
    @UseGuards(JwtAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }

    @Get()
    @ApiOperation({summary: "Get all Categories"})
    @ApiResponse({status: 200, description: 'ok'})
    @UseGuards(JwtAuthGuard)
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }
    @Patch(':id')
    @ApiOperation({summary: "Update a Category"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching category id'})
    @UseGuards(JwtAuthGuard)
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return await this.categoriesService.updateCategory(id, updateCategoryDto);
    }
    @Delete(':id')
    @ApiOperation({summary: "Delete a Category"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching category id'})
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Param('id') id: string): Promise<void> {
        return await this.categoriesService.deleteCategory(id);
    }
}
