import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coupon } from './coupon.model';
import { User } from './user.model';

@Table
export class UserCoupon extends Model<UserCoupon> {
  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isUsed: boolean;

  @Column({
    type: DataType.DATE,
  })
  usedAt: Date;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Coupon)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  couponId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Coupon)
  coupon: Coupon;
}
