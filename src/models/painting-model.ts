import { Schema, model, Types } from "mongoose";

const paintingSchema = new Schema({

    active: {
        type: String,
        enum: ['yes', 'no'],
        requied: [true, 'Active is required']
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        require: [true, 'ImageURL is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        require: [true, 'Price is required'],
    },
    sold: {
        type: String,
        enum: ['yes', 'no'],
        requied: [true, 'Sold is required']
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
    },
    size: {
        type: Types.ObjectId,
        ref: 'Size',
    },
    paints: {
        type: String,
    },


}, {
    timestamps: true
});

const Painting = model('Painting', paintingSchema);

export default Painting;