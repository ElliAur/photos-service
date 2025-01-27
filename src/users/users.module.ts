import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Photo } from 'src/photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo]), ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
