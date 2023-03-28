import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthorizationContext";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
const TransportProcessing = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    
  const handleOrder = async (orderId) => {
    try {
      const { data } = await axios.put("/api/v1/functions/accept-order", {
        orderId
      });
      if (data?.success) {
        toast.success(data.message);
        navigate('/acceptedorders');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/functions/get-all-active-orders"
      );
      if (data?.success) {
        setOrders(data.orders);
        toast.success(data.message);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if(auth.user)fetchOrders();
  }, [auth.user]);
  return (
    <Layout>
      {auth?.user?.role === 3 ? (
        <div className="container">
          <h1>Active Orders</h1>
          <div className="container w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Weight(in tons)</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Price</th>
                  <th scope="col">Ordered at</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((o, i) => (
                  <tr key={o._id}>
                    <td>{i + 1}</td>
                    <td>
                      {o.status === false ? "Not Processed" : "Processed"}
                    </td>
                    <td>{o.weight}</td>
                    <td>{o.from}</td>
                    <td>{o.to}</td>
                    <td>{"\u20B9 "+o.price}</td>
                    <td>{o.createdAt}</td>
                    <td>
                      <button
                        onClick={(e) => {
                            e.preventDefault();
                          handleOrder(o._id);
                        }}
                        className="btn btn-success"
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      ) : (
        <h1 className="text-danger">Access denied</h1>
      )}
    </Layout>
  );
};

export default TransportProcessing;
