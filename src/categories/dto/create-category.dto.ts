import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Sports", description: "Name of Category"})
    name: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Things and places related with sport", description: "Category description"})
    description: string;
}