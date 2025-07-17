import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCoupon } from './user-coupon.model';

export enum CouponType {
  PRESENT = 'PRESENT',
  FIXED = 'FIXED',
}

@Table
export class Coupon extends Model<Coupon> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  code: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(CouponType)),
  })
  type: CouponType;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  value: number;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  minOrderAmount: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  maxUses: number;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  currentUses: number;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validFrom: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validTo: Date;

  @HasMany(() => UserCoupon)
  coupons: UserCoupon[];
}
