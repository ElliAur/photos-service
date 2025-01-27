import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>
    ) {}

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category: Category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return await this.categoriesRepository.save(category);
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find({relations:['photos']});
    }

    async findCategoriesByName(names: string[]): Promise<Category[]> {
        return await this.categoriesRepository.find({where: names.map(name => ({name}))});
    }
    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoriesRepository.findOne({ where: { id }});
        if(!category) throw new NotFoundException('Category not found');
        if(updateCategoryDto.name) category.name = updateCategoryDto.name;
        if(updateCategoryDto.description) category.description = updateCategoryDto.description;
        return await this.categoriesRepository.save(category);
    }
    async deleteCategory(id: string): Promise<void> {
        const category = await this.categoriesRepository.findOne({where: {id}, relations: ['photos']});
        if(!category) throw new NotFoundException('Category not found');
        await this.categoriesRepository.remove(category);
    }
}
