import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Post()
    @ApiOperation({summary: 'Create a new Photo'})
    @ApiCreatedResponse({
        description: "The Photo has veen created successfully",
        type: Photo
    })
    @UseGuards(JwtAuthGuard)
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }
    @Get()
    @ApiOperation({summary: "Get all Photos"})
    @ApiResponse({status: 200, description: 'ok'})
    @UseGuards(JwtAuthGuard)
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Patch(':id')
    @ApiOperation({summary: "Update a Photo"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching photo id'})
    @UseGuards(JwtAuthGuard)
    async updatePhoto(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhoto(id, updatePhotoDto);
    }

    @Delete(':id')
    @ApiOperation({summary: "Delete a Photo"})
    @ApiResponse({status: 200, description: 'ok'})
    @ApiResponse({status: 404, description: 'Could not find matching photo id'})
    @UseGuards(JwtAuthGuard)
    async deletePhoto(@Param('id') id: string): Promise<void> {
        return await this.photosService.deletePhoto(id);
    }
}
