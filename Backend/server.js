import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'

// Loading env variables
config({
    path: './config/config.env'
})

const app = express()


app.use(cors())


app.get('/',(req,res)=>{res.send("Server is up and running")})

const PORT = process.env.PORT  ||  3000

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})