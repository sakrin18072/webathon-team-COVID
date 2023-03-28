import cropModel from "../models/cropModel.js"

export const createCropController = async(request,response)=>{
    try {
        const {name,price} = request.body;
        if(!name || !price) return response.status(400).send({success:false,message:"Name and price are required"});
        const crop = await new cropModel({name,price}).save();
        response.status(201).send({
            success:true,
            message:"Crop created successfully",
            crop
        })
    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}
export const getCropDetailsController = async(request,response)=>{
    try {
        const crops =await cropModel.find({});
        return response.status(200).send({
            success:true,
            message:"All crops fetched successfully",
            crops
        })
    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}
export const getSingleCropController = async(request,response)=>{
    try {
        const {id} = request.body;
        const crop =await cropModel.findOne({_id:id});
        return response.status(200).send({
            success:true,
            message:"All crops fetched successfully",
            crop
        })
    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}

export const updateSingleCropController = async(request,response)=>{
    try {
        const {name,price,id} = request.body;
        const crop = await cropModel.findByIdAndUpdate(id,{name,price},{new:true});
        await crop.save();
        return response.status(201).send({
            success:true,
            message:"Crop modified successfully",
            crop
        })

    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}

export const deleteCropController =async (request,response)=>{
    try {
        const id = request.params.id;
        console.log(id)
        await cropModel.findByIdAndDelete(id);
        return response.status(200).send({
            success:true,
            message:"crop deleted successfully",
        })

    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}