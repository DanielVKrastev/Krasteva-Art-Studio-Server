import { Schema, model } from "mongoose";

const aboutSchema = new Schema({
    address: {
        type: String, 
        required: [true, 'Address is required'],
    },
    deletehash: {
        type: String, 
    },
    description: {
        type: String, 
        required: [true, 'Description is required'],

    },
    email: {
        type: String, 
        required: [true, 'Email is required'],

    },
    imageUrl: {
        type: String, 
        required: [true, 'Image is required'],

    },
    name: {
        type: String, 
        required: [true, 'Name is required'],

    },
    showAddress: {
        type: Boolean, 

    },
    telephone: {
        type: String, 
        required: [true, 'Telephone is required'],
    }

}, {
    timestamps: true
});

const About = model('About', aboutSchema);

export default About;