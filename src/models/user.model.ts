import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { Review } from './review.model';
import { UserCoupon } from './user-coupon.model';

export enum UserRoles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    allowNull: false,
    defaultValue: UserRoles.CUSTOMER,
    type: DataType.ENUM(...Object.values(UserRoles)),
  })
  role: UserRoles;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  provider: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Order)
  orders: Order[];

  @HasOne(() => Cart)
  cart: Cart[];

  @HasMany(() => UserCoupon)
  coupons: UserCoupon[];

  @HasMany(() => Review)
  reviews: Review[];
}
