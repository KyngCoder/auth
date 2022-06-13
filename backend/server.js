const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDb = require('./connectDb')

const userRoutes = require('./userRoute.js')


const app = express()
dotenv.config()
connectDb()

app.use(cors())
app.use(express.json())


app.use('/user',userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`server started on port : ${PORT}`))