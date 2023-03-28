import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    weight:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
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
    accepted:{
        type:mongoose.ObjectId,
        ref:'user',
    }
    
},{timestamps:true})

export default mongoose.model('orders',orderSchema);