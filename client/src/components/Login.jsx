import React from "react";
import Layout from "./Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthorizationContext";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth,setAuth] = useAuth();
  const formSubmit = async (dat) => {
    try {
      
      const { data } = await axios.post("/api/v1/auth/login", dat);
      if (data?.success) {
        toast.success(data?.message);
        setAuth({...auth,user:data?.user,token:data?.token});
        localStorage.setItem('auth',JSON.stringify(data))
        navigate(location.state || "/")
        
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <Layout>
      <div className="container w-25 mx-auto mt-5 m-3 shadow rounded border d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h1 className="mx-auto mt-4 p-4">Login</h1>
          <hr />

          <div className="mb-4 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Phone Number</h5>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("phone")}
            />
          </div>

          <div className="mb-4  mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>* Password</h5>
            </label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
            />
          </div>

          <button type="submit" className="btn btn-dark m-5">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
