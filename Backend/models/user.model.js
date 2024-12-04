import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long'],
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must at least 5 characters long'],
    },

    password: {
        type: String,
        required: true,
        select: false    // this property means that by default , password will not be returned in the response when you query the database for a user.
    },

    socketId: {
        type: String
    }
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
    return await bcryptjs.hash(password, 10)
}


export const userModel = mongoose.model('User', userSchema)