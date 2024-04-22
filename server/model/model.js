import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    genero: String,
    status: String
});

const Clientdb = model('clientdb', schema);

export default Clientdb;
