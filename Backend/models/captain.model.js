import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long']
        },
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid Email']
    },

    password: {
        type: String,
        required: true,
        select: false    
    },

    socketId:{
        type: String
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle:{
        color:{
            type: String,
            required: true,
            minLength: [3, 'Color must be of at least 3 characters long']
        },
        numberplate:{
            type: String,
            required: true,
            minLength: [3, 'Number Plate must be of at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            minLength: [1, 'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ["car", 'motorcycle', 'auto']
        }
    },

    location:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
})


captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}


captainSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcryptjs.hash(password, 10)
}




export const captainModel = mongoose.model("Captain", captainSchema)