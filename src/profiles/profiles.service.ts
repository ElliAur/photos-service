import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>) {}
    
    async insertProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
        const profile: Profile = new Profile();
        profile.gender = createProfileDto.gender;
        profile.photo = createProfileDto.photo;
        return await this.profilesRepository.save(profile);
    }
    async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        const profile = await this.profilesRepository.findOne({ where: { id }});
        if(!profile) throw new NotFoundException('Profile not found');
        if(updateProfileDto.gender) profile.gender = updateProfileDto.gender;
        if(updateProfileDto.photo) profile.photo = updateProfileDto.photo;
        return await this.profilesRepository.save(profile);
    }
    async deleteProfile(id: string): Promise<void> {
        const profile = await this.profilesRepository.findOne({ where: { id }});
        if(!profile) throw new NotFoundException('Profile not found');
        await this.profilesRepository.delete(id);
    }
}
