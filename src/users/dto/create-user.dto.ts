import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "src/profiles/dto/create-profile.dto";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "example@example.fi", description: "Email of User"})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "password", description: "Password of User"})
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "John", description: "Name of User"})
    name: string;

    @IsOptional()
    @ApiProperty({example: {"gender":"female","photo":"url-to-photo"}, description: "Profile of User"})
    profile?: CreateProfileDto;
}