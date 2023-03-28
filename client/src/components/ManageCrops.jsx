import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "./Layout/Layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../Contexts/AuthorizationContext";
const ManageCrops = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [crops, setCrops] = useState([]);
  const [show, setShow] = useState(false);
  const [id,setId] = useState('');
  const [auth,setAuth] = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = async()=>{
    try {
        const {data} = await axios.put('/api/v1/crop/update-crop',{name,price,id});
        if(data?.success){
            toast.success(data.message);
            getCrops();
        }
        else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
  }
  const getCrops = async () => {
    try {
      const { data } = await axios.get("/api/v1/crop/get-crops");
      if (data?.success) {
        setCrops(data.crops);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleAdd = async () => {
    try {
      const { data } = await axios.post("/api/v1/crop/create-crop", {
        name,
        price,
      });
      if (data?.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleDelete = async(id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/crop/delete-crop/${id}`);
      if(data?.success){
        toast.success(data.message);
        window.location.reload();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if(auth?.user) getCrops();
  }, [auth?.user]);
  return (
    <Layout>
      <div className="container w-50">
        <h1 className="text-center m-3">Modify Crops</h1>
        <form className=" m-3 mx-auto" role="search">
          <input
            className="form-control m-2"
            type="search"
            placeholder="Name of the crop"
            aria-label="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control m-2"
            type="search"
            placeholder="Price of the crop"
            aria-label="Search"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            className="btn btn-outline-success m-2"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            Add Crop
          </button>
        </form>
      </div>
      <div className="container w-50">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price(Per quintal)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops?.map((c, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <button className="btn btn-warning m-1" onClick={()=>{setId(c._id);setName(c.name);setPrice(c.price);handleShow()}}>Edit </button>
                <button className="btn btn-danger text-dark m-1" onClick={()=>{handleDelete(c._id)}}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Crop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className=" m-3 mx-auto" role="search">
          <input
            className="form-control m-2"
            type="search"
            placeholder="Name of the crop"
            aria-label="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control m-2"
            type="search"
            placeholder="Price of the crop"
            aria-label="Search"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={(e) => {
              e.preventDefault();
              handleEdit();
              handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </Layout>
  );
};

export default ManageCrops;
