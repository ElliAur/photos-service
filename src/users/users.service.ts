import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class UsersService {

    private slatRounds = 10;
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
        private readonly profilesService: ProfilesService,
    ) {}
    
    async insertUser(createUserDto: CreateUserDto): Promise<User> {
        let profile: Profile = null;
        
        if(createUserDto.profile) {
            profile = await this.profilesService.insertProfile(createUserDto.profile)
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.slatRounds);
        const user = this.usersRepository.create({
            'username': createUserDto.username,
            'password': hashedPassword,
            'name': createUserDto.name,
            'profile': profile,
        })
        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException('An internal server error while creating user')
            }
        }
        
    }
    async createAdmin(): Promise<void> {
        const userCount = await this.usersRepository.count();
        if(userCount === 0) {
            const adminUser: CreateUserDto = {
                username: 'admin@photosservice.fi',
                password: 'admin123',
                name: 'admin'
            };
            const admin = await this.insertUser(adminUser);
            console.log('Admin user created');
        }
    }
    async findUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ['profile', 'photos']});
    }
    async findUserById(id: string): Promise<User> {
        const user=  await this.usersRepository.findOne({where: {id}, relations: ['profile', 'photos']});
        if(!user) throw new NotFoundException('id not found');
        return {...user};
    }
    async findUserByEmail(username: string): Promise<User> {
        const user=  await this.usersRepository.findOne({where: {username}});
        return {...user};
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id}, relations: ['profile']});
        if(!user) throw new NotFoundException('User not found');
        if(updateUserDto.name) user.name = updateUserDto.name;
        if(updateUserDto.username) user.username = updateUserDto.username;
        if(updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, this.slatRounds);
            user.password = hashedPassword;
        }
        if(updateUserDto.profile) {
            const profile = await this.profilesService.updateProfile(user.profile.id, updateUserDto.profile)
            user.profile = profile;
        }
        return await this.usersRepository.save(user);
    }
    async deleteUser(id: string): Promise<void> {
        const user = await this.usersRepository.findOne({where: { id }, relations: ['profile', 'photos']});
        if(!user) throw new NotFoundException('User not found');

        await this.photosRepository.delete({user: {id}});
        await this.usersRepository.delete(id);
        if (user.profile) await this.profilesService.deleteProfile(user.profile.id);
    }

}
