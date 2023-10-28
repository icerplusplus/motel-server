import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesCoreService } from '@/services/categories/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@/shared/dtos';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryCoreService: CategoriesCoreService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name)
      throw new BadRequestException('Data not provided!');
    const newCategory = await this.categoryCoreService.create(
      createCategoryDto,
    );
    return {
      statusCode: 200,
      message: 'OK',
      data: newCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryCoreService.find();
    return {
      statusCode: 200,
      message: 'OK',
      data: categories,
    };
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('ID is not valid');
    const findCategory = await this.categoryCoreService.findOne(id);
    if (!findCategory) throw new BadRequestException('Cannot find category');
    return {
      statusCode: 200,
      message: 'OK',
      data: findCategory,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryCoreService.update(
      id,
      updateCategoryDto,
    );
    if (!updatedCategory)
      throw new BadRequestException('Cannot find category with ID: ' + id);
    return {
      statusCode: 200,
      message: 'OK',
      data: updatedCategory,
    };
  }

  async remove(id: string) {
    const isRemoved = await this.categoryCoreService.remove(id);
    if (!isRemoved) throw new BadRequestException('Delete category failed');
    return {
      statusCode: 200,
      message: 'OK',
      data: true,
    };
  }
}
