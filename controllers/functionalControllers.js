
import orderModel from "../models/orderModel.js";


export const transportRequestController = async (request,response)=>{
  try {
    const {weight,from,to,price} = request.body;
    const order = await new orderModel({weight,from,to,user:request.user._id,price}).save();
    return response.status(201).send({
      success:true,
      message:"Order created successfully",
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

export const getTransportOrdersController = async (request,response)=>{
  try {
    const orders = await orderModel.find({user:request?.user?._id}).sort({createdAt:-1});
    return response.status(200).send({
      success:true,
      message:"Orders fetched successfully",
      orders
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}
export const getAllActiveTransportOrdersController = async (request,response)=>{
  try {
    const orders = await orderModel.find({status:0}).sort({createdAt:-1});
    return response.status(200).send({
      success:true,
      message:"Orders fetched successfully",
      orders
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}

export const acceptOrderController = async (request,response)=>{
  try {
    const {orderId} = request.body;
    const dealerId = request.user._id;
    const order = await orderModel.findByIdAndUpdate({_id:orderId},{accepted:dealerId,status:1},{new:true});
    await order.save();
    return response.status(201).send({
      success:true,
      message:"Order accepted",
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

export const fetchAcceptedOrdersController = async (request,response)=>{
  try {
    const {id} = request.body;
    const orders = await orderModel.find({$and:[{status:1},{accepted:id}]}).populate('user');
    return response.status(201).send({
      success:true,
      message:"Order accepted",
      orders
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success:false,
      error
    })
  }
}
