
import storageModel from "../models/storageModel.js";


export const storageRequestController = async (request,response)=>{
  try {
    const {weight,price} = request.body;
    const storage = await new storageModel({weight,price,status:1}).save();
    return response.status(201).send({
      success:true,
      message:"Storage allocated successfully",
      storage
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}

export const getStorageOrdersController = async (request,response)=>{
  try {
    const storages = await storageModel.find({user:request?.user?._id}).sort({createdAt:-1});
    return response.status(200).send({
      success:true,
      message:"Storages fetched successfully",
      storages
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}
export const getAllAvailableStoragesController = async (request,response)=>{
  try {
    const storages = await storageModel.find({status:0}).sort({createdAt:-1});
    return response.status(200).send({
      success:true,
      message:"Storages fetched successfully",
      storages
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}

export const acceptStorageController = async (request,response)=>{
  try {
    const {storageId} = request.body;
    const dealerId = request.user._id;
    const storage = await storageModel.findByIdAndUpdate({_id:storageId},{user:dealerId,status:1},{new:true});
    await storage.save();
    return response.status(201).send({
      success:true,
      message:"Storage accepted",
      order
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}

export const fetchAcceptedStoragesController = async (request,response)=>{
  try {
    const storages = await storageModel.find({$and:[{status:1}]});
    return response.status(201).send({
      success:true,
      message:"Storages Fetched",
      storages
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}

export const freeStorage =async (request,response)=>{
    try {
        const id = request.user._id;
        const storage = await storageModel.findByIdAndUpdate(id,{status:0},{new:true});
        await storage.save();
    } catch (error) {
        console.log(error);
    response.status(400).send({
      success:false,
      error
    })
    }
}
