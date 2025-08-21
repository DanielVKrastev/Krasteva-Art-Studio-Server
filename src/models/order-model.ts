import { Schema, model } from "mongoose";
import { DeliveryType, Order, OrderStatus } from "../interfaces/Order.js";

export interface OrderDocument extends Order, Document { }

const orderSchema = new Schema<OrderDocument>({

    address: {
        type: String,
        required: [true, "Address is required"]
    },
    delivery: {
        type: String,
        enum: Object.values(DeliveryType),
        required: [true, "Delivery type is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    paintingIds: {
        type: [String],
        required: [true, "Painting IDs are required"]
    },
    postCode: {
        type: String,
        required: [true, "Post code is required"]
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
        required: [true, "Status is required"]
    },
    telephone: {
        type: String,
        required: [true, "Telephone is required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"]
    },
    town: {
        type: String,
        required: [true, "Town is required"]
    }
}, {
    timestamps: false
});

const Order = model('Order', orderSchema);

export default Order;