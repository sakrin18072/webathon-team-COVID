import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
const CropPrices = () => {
    const [prices,setPrices] = useState([]);
    const [crops,setCrops] = useState([]);
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
    useEffect(()=>{getCrops()},[]);
  return (
    <Layout>
        <h1 className='text-center'>Crop Prices today</h1>
        <div className="container w-50">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price(Per quintal)</th>
            </tr>
          </thead>
          <tbody>
            {crops?.map((c, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

    </Layout>
  )
}

export default CropPrices