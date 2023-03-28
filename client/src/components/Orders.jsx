import React, { useEffect , useState} from 'react'
import { useAuth } from '../Contexts/AuthorizationContext'
import Layout from './Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Orders = () => {
    const [auth,setAuth] = useAuth();
    const [orders,setOrders] = useState([]);
    const fetchOrders = async ()=>{
        try {
            const {data} = await axios.get('/api/v1/functions/get-orders');
            if(data?.success){
                setOrders(data.orders);
                toast.success(data.message);
                console.log(data);
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{fetchOrders()},[])
  return (
    <Layout>
        {auth?.user ?
        
        <div className='container'>
            <h1>Orders</h1>
            <div className='container w-75'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Weight(in tons)</th>
                        <th scope='col'>From</th>
                        <th scope='col'>To</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Ordered at</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map((o,i)=>(
                            <tr key={o._id}>
                                <td>{i+1}</td>
                                <td>{o.status===false?"Not Processed":"Processed"}</td>
                                <td>{o.weight}</td>
                                <td>{o.from}</td>
                                <td>{o.to}</td>
                                <td>{"\u20B9 "+o.price}</td>
                                <td>{o.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            </div>
            
        </div>
        
        
        
        
        
        
        
        
        
        :
        
        <h1>Login to fetch your orders</h1>}
    </Layout>
  )
}

export default Orders