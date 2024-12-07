import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/user.route.js'
import captainRoutes from './routes/captain.route.js'
import cookieParser from 'cookie-parser'

// Loading env variables
config({
    path: './config/config.env'
})

connectDB()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/',(req,res)=>{res.send("Server is up and running")})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

const PORT = process.env.PORT  ||  3000

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})