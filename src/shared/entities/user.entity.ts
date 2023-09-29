import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DATABASE, Roles } from '../utils/variables';

@Entity({ name: 'users', database: DATABASE.DB_NAME })
export class UserEntity extends BaseEntity {
  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  fullname: string;

  @Column({
    unique: true,
    type: 'text',
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
  })
  phoneNumber: string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  address: string;

  @Column()
  birthDate: string;

  @Column({
    type: 'text',
    default: 'male',
  })
  gender: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'enum',
    enum: Roles,
    nullable: true,
    default: Roles.USER,
  })
  role: Roles;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  token: string;
}
