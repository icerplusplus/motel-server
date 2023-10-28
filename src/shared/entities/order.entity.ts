import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DATABASE } from '../utils/variables';
import { MotelEntity } from './motel.entity';
import { UserEntity } from './user.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

export enum PaymentMethod {
  NULL = 'NULL',
  VISA = 'VISA',
}

@Entity({ name: 'orders', database: DATABASE.DB_NAME })
export class OrderEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: true,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
    default: PaymentMethod.NULL,
  })
  method: PaymentMethod;

  @ManyToOne(() => MotelEntity, (motel) => motel.ID)
  @JoinColumn({ name: 'motel' })
  motel: MotelEntity;

  @ManyToOne(() => UserEntity, (user) => user.ID)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
