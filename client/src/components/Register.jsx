import React, { useState } from "react";
import Layout from "./Layout/Layout";
import { Radio, Space } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Register = () => {
  const [role,setRole] = useState(0);
  const navigate = useNavigate();
  const formSubmit =async (dat) => {
    try {
      dat.role = role;
      const {data} = await axios.post("/api/v1/auth/register", dat);
      if(data?.success){
        toast.success(data?.message);
        navigate("/login");
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    
    
  };
  const {register,handleSubmit} = useForm();
  return (
    <Layout>
      <div className="container shadow w-50 mt-5 rounded">
        <form onSubmit={handleSubmit(formSubmit)}>
          <h1 className="mx-auto mt-4 p-4">Register</h1>
          <hr />
          <div className="mt-5 mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>* Name</h5>
            </label>
            <input
              type="text"
              className="form-control "
              {...register('name')}
            />
          </div>
          <div className="mb-4 w-50 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Phone Number</h5>
            </label>
            <input
              type="text"
              className="form-control"
              {...register('phone')}
            />
          </div>
          <div className="mb-4 w-50 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Address</h5>
            </label>
            <input
              type="text"
              className="form-control"
              {...register('address')}
            />
          </div>
          <div className="mb-4 w-50 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Security Question</h5>
            </label>
            <input
              type="text"
              className="form-control"
              {...register('answer')}
            />
          </div>
          <div className="mb-4 w-50 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Password</h5>
            </label>
            <input
              type="password"
              className="form-control"
              {...register('password')}
            />
          </div>
          <div className="mb-4 w-50 mx-auto">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-center"
            >
              <h5>Email Address</h5>
            </label>
            <input
              type="text"
              className="form-control"
              {...register('email')}
            />
          </div>

          <div>
            <Radio.Group onChange={(e) => setRole(e.target.value)}>
              <Space direction="horizontal">
                <Radio value={5}>Storage Provider</Radio>
                <Radio value={1}>Farmer</Radio>
                <Radio value={2}>Dealer</Radio>
                <Radio value={3}>Transport</Radio>
              </Space>
            </Radio.Group>
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
  );
};

export default Register;
