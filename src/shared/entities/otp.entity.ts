import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DATABASE } from '../utils/variables';

@Entity({ name: 'otps', database: DATABASE.DB_NAME })
export class OtpEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  phoneNumber: string;

  @Column({
    type: 'text',
  })
  otp: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  expirationTimestamp: Date;
}
