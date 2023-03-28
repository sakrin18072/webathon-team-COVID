import React, { useState } from "react";
import Layout from "./Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthorizationContext";
const Transport = () => {
    const [role,setRole] = useState(0);
    const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const formSubmit =async (dat) => {
    try {
      if(!auth.user){
        navigate('/login',{
            state:'/transport'
        })
      }
      const {data} = await axios.post("/api/v1/functions/transport", dat);
      if(data?.success){
        toast.success(data?.message);
        navigate("/orders");
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    
    
  };
  const {register,handleSubmit,formState:{errors}} = useForm();
  return (
    
    <Layout>
        <div className="container shadow w-50 mt-5 rounded">
        <form onSubmit={handleSubmit(formSubmit)}>
          <h1 className="mx-auto mt-4 p-4">Request a vehicle</h1>
          <hr />
          <div className="mt-5 mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>Weight of crops (in tons)</h5>
            </label>
            <input
              type="text"
              className="form-control "
              {...register('weight',{required:true})}
            />
            {errors.weight && <p className="text-danger mt-1">* This field is required</p>}
          </div>
          <div className="mt-5 mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>Pick up location</h5>
            </label>
            <input
              type="text"
              className="form-control "
              {...register('from',{required:true})}
            />
            {errors.from && <p className="text-danger mt-1">* This field is required</p>}
          </div>
          <div className="mt-5 mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>Drop location</h5>
            </label>
            <input
              type="text"
              className="form-control "
              {...register('to',{required:true})}
            />
            {errors.to && <p className="text-danger mt-1">* This field is required</p>}
          </div>
          <div className="mt-5 mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>Price in {"\u20B9"}</h5>
            </label>
            <input
              type="text"
              className="form-control "
              {...register('price',{required:true})}
            />
            {errors.price && <p className="text-danger mt-1">* This field is required</p>}
          </div>
          

          <button
            type="submit"
            className="btn btn-dark m-5"
          >
            Submit
          </button>
        </form>
      </div>
    
    </Layout>
  )
}

export default Transport