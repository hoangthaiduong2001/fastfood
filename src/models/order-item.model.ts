import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItemIngredient } from './order-item-ingredient.model';
import { Order } from './order.model';
import { ProductVariant } from './product-variant.model';
import { Product } from './product.model';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => Order)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderId: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => ProductVariant)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  variantId: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @HasMany(() => OrderItemIngredient)
  ingredients: OrderItemIngredient[];
}
