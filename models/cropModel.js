import mongoose from "mongoose";
const cropSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        require:true
    }
})

export default mongoose.model('crop',cropSchema);