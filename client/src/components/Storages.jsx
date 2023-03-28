import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Layout from './Layout/Layout'

const Storages = () => {
    const [storages,setStorages] = useState([]);
    const fetchAvailableStorages = async()=>{
        try {
            const {data} = await axios.get('/api/v1/storage/available-storages');
            if(data?.success){
                toast.success(data.message);
                setStorages(data.storages)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const handleBook = async()=>{
        try {
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{fetchAvailableStorages()},[]);
  return (
    <Layout>
        <h1 className='text-center m-3'>Available Storages</h1>
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
            {storages?.map((c, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <button className="btn btn-success text-dark m-1" onClick={()=>{handleBook(c._id)}}>Book</button>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </Layout>

  )
}

export default Storages