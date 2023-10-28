import { Module } from '@nestjs/common';
import { CategoriesCoreService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoriesCoreService],
  exports: [CategoriesCoreService],
})
export class CategoriesCoreModule {}
