import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DATABASE } from '../utils/variables';
import { MotelEntity } from './motel.entity';

@Entity({ name: 'categories', database: DATABASE.DB_NAME })
export class CategoryEntity extends BaseEntity {
  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  name: string;

  @OneToMany(() => MotelEntity, (motel) => motel.category)
  motels: MotelEntity[];
}
