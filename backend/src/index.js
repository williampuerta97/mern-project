import mongoose from 'mongoose'
import express from 'express'
import UserModel from './models/UserModel'
import cors from 'cors'
const app = express();
const PORT = 3001

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern', {useNewUrlParser: true, useCreateIndex: true,})
.then(()=> {
    console.log('database connected')

    app.get('/users', async (req, res)=>{
        const users = await UserModel.find()
        res.json(users)
    })

    app.post('/users', async (req, res)=>{
        const { nit, nombre, apellido, edad } = req.body
        const user = new UserModel({nit, nombre, apellido, edad});
        await user.save()
        res.json({status:"true", message:"Registro insertado"})
    })

    app.put('/users/:id', async (req, res)=>{
        const { nit, nombre, apellido, edad } = req.body
        const newUser = { nit, nombre, apellido, edad }
        await UserModel.findByIdAndUpdate(req.params.id, newUser)
        res.json({status: true, message:"Registro actualizado"})
    })

    app.delete('/users/:id', async (req, res)=>{
        await UserModel.findByIdAndDelete(req.params.id)
        .then(res.json({status:true, message:"Registro eliminado"}))
        .catch( err => res.json({status:false, message:`Error: ${err}`}))
    })

    app.get('/users/:id', async (req, res)=>{
        const user = await UserModel.findById(req.params.id)
        res.json(user)
    })
})
.catch((err)=> console.log(err))

app.listen(PORT, ()=> console.log(`server runing on port ${PORT}`))