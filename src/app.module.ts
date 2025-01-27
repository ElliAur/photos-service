import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersService } from './users/users.service';

console.log(`ormconfig at start ${JSON.stringify(ormconfig)}`);

// Define the AppModule class and its metadata
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, ProfilesModule, PhotosModule, AuthModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  // Initialize the module and create an admin user if not exists
  async onModuleInit() {
    await this.usersService.createAdmin();
  }
}
