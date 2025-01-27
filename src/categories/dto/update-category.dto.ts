import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

// DTO for updating a category, extends CreateCategoryDto with optional properties
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}