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
import { OrderItem } from './order-item.model';
import { Product } from './product.model';

export enum ProductVariantSize {
  SMALL = '15cm',
  MEDIUM = '20cm',
  LARGE = '25cm',
}

export enum ProductVariantType {
  THIN = 'THIN',
  NORMAL = 'NORMAL',
}

@Table
export class ProductVariant extends Model<ProductVariant> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ProductVariantSize)),
  })
  size: ProductVariantSize;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ProductVariantType)),
  })
  type: ProductVariantType;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  modifiedPrice: number;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
