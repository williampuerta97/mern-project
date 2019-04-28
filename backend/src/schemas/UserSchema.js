import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    nit : Number,
    nombre: String,
    apellido: String,
    edad: Number
})

export default UserSchema