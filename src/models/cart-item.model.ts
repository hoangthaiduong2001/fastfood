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
import { Cart } from './cart.model';
import { ProductVariant } from './product-variant.model';
import { Product } from './product.model';

@Table
export class CartItem extends Model<CartItem> {
  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => Cart)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  cartId: number;

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

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @HasMany(() => CartItemIngredient)
  ingredients: CartItemIngredient[];
}
