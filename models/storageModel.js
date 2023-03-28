import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({
    weight:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.ObjectId,
        ref:'users'
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:0
    },
    
},{timestamps:true})

export default mongoose.model('storage',storageSchema);