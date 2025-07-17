import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { OrderItem } from './order-item.model';

@Table
export class OrderItemIngredient extends Model<OrderItemIngredient> {
  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => OrderItem)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderItemId: number;

  @ForeignKey(() => Ingredient)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @BelongsTo(() => OrderItem)
  orderItem: OrderItem;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;
}
