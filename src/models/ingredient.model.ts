import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartItemIngredient } from './cart-item-ingredient.model';
import { Category } from './category.model';
import { OrderItemIngredient } from './order-item-ingredient.model';

@Table
export class Ingredient extends Model<Ingredient> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  imageUrl: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  price: string;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isRequired: boolean;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => OrderItemIngredient)
  orderItemIngredients: OrderItemIngredient[];

  @HasMany(() => CartItemIngredient)
  cartItemIngredients: CartItemIngredient[];
}
