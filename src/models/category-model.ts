import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    imageUrl: {
        type: String,
        require: [true, 'ImageURL is required'],
    },
    deletehash: {
        type: String,
    },


}, {
    timestamps: true
});

const Category = model('Category', categorySchema);

export default Category;