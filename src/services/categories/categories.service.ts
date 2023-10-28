import { CreateCategoryDto, UpdateCategoryDto } from '@/shared/dtos';
import { CategoryEntity } from '@/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesCoreService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async find() {
    return await this.categoryRepository.find({
      relations: ['motels'],
    });
  }

  async findOne(ID: string) {
    return await this.categoryRepository.findOne({
      where: { ID },
      relations: ['motels'],
    });
  }

  async update(ID: string, updateCategoryDto: UpdateCategoryDto) {
    const findCategory = await this.findOne(ID);
    if (!findCategory) return;
    return await this.categoryRepository.save({
      ...findCategory,
      ...updateCategoryDto,
    });
  }

  async remove(ID: string): Promise<boolean> {
    const findCategory = await this.findOne(ID);
    if (!findCategory) return false;
    const result = await this.categoryRepository.softDelete(ID);
    if (!result || result.affected === 0) return false;
    return result.affected === 1;
  }
}
