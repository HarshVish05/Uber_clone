import mongoose from 'mongoose';

// Define the schema
const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // 24 hours in seconds
  },
});

// Create the model
export const blacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

