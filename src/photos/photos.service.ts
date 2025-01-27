import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService
    ) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.owner);
        if(!user) throw new NotFoundException('Owner not found');

        const categories = await this.categoriesService.findCategoriesByName(createPhotoDto.categories);
        if (categories.length !== createPhotoDto.categories.length) {
            throw new NotFoundException('One or more categories not found');
        }

        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.location = createPhotoDto.location;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        photo.categories = categories;
        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        const photos = await this.photosRepository.find({relations:['user', 'categories']});
        photos.forEach((photo) => {
            if (photo.user) {
                photo.user.password = "";
            }
        });
        return photos;
    }

    async updatePhoto(id: string, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        const photo = await this.photosRepository.findOne({ where: { id }, relations: ['user', 'categories'] });   
        if (!photo) throw new NotFoundException('Photo not found');
        if(updatePhotoDto.name) photo.name = updatePhotoDto.name;
        if(updatePhotoDto.location) photo.location = updatePhotoDto.location;
        if(updatePhotoDto.description) photo.description = updatePhotoDto.description;
        if(updatePhotoDto.url) photo.url = updatePhotoDto.url;

        if(updatePhotoDto.owner) {
            const user = await this.usersService.findUserByEmail(updatePhotoDto.owner);
            if(!user) throw new NotFoundException('Owner not found');
            photo.user = user;
        }
        if(updatePhotoDto.categories) {
            const categories = await this.categoriesService.findCategoriesByName(updatePhotoDto.categories);
            if (categories.length !== updatePhotoDto.categories.length) {
                throw new NotFoundException('One or more categories not found');
            }
            photo.categories = categories;
        }
        return await this.photosRepository.save(photo);
    }

    async deletePhoto(id: string): Promise<void> {
        const photo = await this.photosRepository.findOne({ where: { id } });
        if (!photo) throw new NotFoundException('Photo not found');
        await this.photosRepository.delete(id);
    }
}
