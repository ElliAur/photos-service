import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Tennis ball", description: "Name of Photo"})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Pori", description: "Location of Photo"})
    location: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Tennis ball on table", description: "Description of Photo"})
    description: string;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({example: "url-to-photo", description: "URL of Photo"})
    url: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "example@example.fi", description: "Owner of Photo"})
    owner: string;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({example: ["Sports", "Tennis"], description: "Categories of Photo"})
    categories: string[];
}