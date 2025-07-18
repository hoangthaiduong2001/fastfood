import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Product } from './product.model';
import { User } from './user.model';

@Table
export class Review extends Model<Review> {
  @Column({
    type: DataType.TEXT,
  })
  comment: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => Order)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;
}
