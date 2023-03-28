import React, { useState } from 'react'
import Layout from './Layout/Layout'
import { useNavigate } from 'react-router-dom';
import {BsTelephone} from 'react-icons/bs'
import { useAuth } from '../Contexts/AuthorizationContext';
const Home = () => {
  const [searchText,setSearchText] = useState();
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
            <img src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800" style={{borderRadius:"20px",width:'100%'}} alt="" />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='bold display-1'>Need help with farming? </h1>
            <h4>Here we are at your fingertips</h4>
            <form className="d-flex mx-auto justify-content-center w-75 mt-3" role="search">
              <input
                className="form-control me-2 self-align-center p-2"
                type="search"
                placeholder="Any doubts related to farming??"
                aria-label="Search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                onClick={()=>navigate(`/search/${searchText}`)}
                className="btn btn-dark"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='bold display-1'>Any query regarding farmer? </h1>
            <h4>We are here</h4>
            <h5><BsTelephone/>&nbsp;&nbsp;040-1234567</h5>
          </div>
          <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
            <img src="https://images.pexels.com/photos/1276235/pexels-photo-1276235.jpeg?auto=compress&cs=tinysrgb&w=800" style={{borderRadius:"20px",width:'100%'}} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
            <img src="https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{borderRadius:"20px",width:'100%'}} alt="" />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='bold display-1'>Need help with weather? </h1>
            <h4>Get live forecasting of weather</h4>
            <button
                onClick={()=>navigate(`/weather`)}
                className="btn btn-dark m-3"
                type="submit"
              >
                Get weather Info
              </button>
          </div>
          <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='bold display-1'>Want to ship your crops? </h1>
            <h4>We are here</h4>
            {
              auth?.user?.id!==3 && <button onClick={()=>navigate('/transport')} className='btn btn-dark m-3'>Book a vehicle</button>
            }
          </div>
          <div className="col-12 col-md-6 mt-5 d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
            <img src="https://images.pexels.com/photos/745266/pexels-photo-745266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{borderRadius:"20px",width:'100%'}} alt="" />
            
          </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

