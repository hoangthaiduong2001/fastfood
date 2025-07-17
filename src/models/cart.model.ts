import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartItem } from './cart-item.model';
import { User } from './user.model';

@Table
export class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
