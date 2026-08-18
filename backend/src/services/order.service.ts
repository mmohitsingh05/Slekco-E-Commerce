import mongoose, { Types } from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

export interface CreateOrderInput {
  items: { product: string; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput) {
  const ids = [...new Set(input.items.map((item) => item.product))];
  const products = await Product.find({ _id: { $in: ids } }).lean();

  if (products.length !== ids.length) {
    throw new ApiError(409, 'One or more products were not found');
  }

  const byId = new Map(products.map((p) => [p._id.toString(), p]));

  const orderItems = input.items.map((item) => {
    const product = byId.get(item.product);
    if (!product) throw new ApiError(409, `Product ${item.product} was not found`);
    if (product.stock < item.quantity) {
      throw new ApiError(409, `Insufficient stock for "${product.name}"`);
    }
    return {
      product: product._id as Types.ObjectId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const order = await Order.create({
    items: orderItems,
    subtotal,
    shipping,
    total,
    status: 'pending',
  });

  return order;
}

export async function getOrderById(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(404, 'Order not found');
  }
  const order = await Order.findById(id).populate('user', 'name email').lean();
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
}