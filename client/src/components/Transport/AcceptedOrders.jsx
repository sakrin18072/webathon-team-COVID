import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthorizationContext";
const AcceptedOrders = () => {
  const [auth, setAuth] = useAuth();
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const fetchAcceptedOrders = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/functions/accepted-orders",{id});
      if (data?.success) {
        setAcceptedOrders(data.orders);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if(auth.user) fetchAcceptedOrders(auth.user._id);
  }, [auth.user]);
  return (
    <Layout>
      <div className="container">
        <h1>Accepted Orders</h1>
        <div className="container w-75">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Weight(in tons)</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Ordered at</th>
                <th scope="col">Phone number</th>
              </tr>
            </thead>
            <tbody>
              {acceptedOrders?.map((o, i) => (
                <tr key={o._id}>
                  <td>{i + 1}</td>
                  <td>{o.status === false ? "Not Processed" : "Processed"}</td>
                  <td>{o.weight}</td>
                  <td>{o.from}</td>
                  <td>{o.to}</td>
                  <td>{o.createdAt}</td>
                  <td>{o.user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AcceptedOrders;
