import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { toast } from "react-hot-toast";
import Dropdown from 'react-bootstrap/Dropdown';
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
    navigate("/home");
  };
  const [auth, setAuth] = useAuth();
  const [searchText, setSearchText] = useState("");
  const handleClick = (value) => {
    navigate(`/search/${searchText}`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">E-kissan</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="d-flex mx-auto justify-content-center w-75"
              role="search"
            >
              <input
                className="form-control me-2 self-align-center"
                type="search"
                placeholder="Any doubts related to farming ?? "
                aria-label="Search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                onClick={handleClick}
                className="btn btn-outline-dark"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <Dropdown>
                <Dropdown.Toggle variant="light" size="md" id="dropdown-basic">
                  Get help
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  
                  <Dropdown.Item onClick={()=>{navigate('/crop-prices')}}>
                    Crop prices
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/weather')}}>
                    Weather conditions
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/storages')}}>
                    Available storages
                  </Dropdown.Item>
                  {auth?.user?.role!==3 && <Dropdown.Item onClick={()=>{navigate('/transport')}}>
                    Book a vehicle
                  </Dropdown.Item>}
                  {auth?.user?.role!==3 ?<Dropdown.Item onClick={()=>{navigate('/orders')}}>
                    My orders
                  </Dropdown.Item>:
                  <Dropdown.Item onClick={()=>{navigate('/acceptedorders')}}>
                  Accepted orders
                </Dropdown.Item>
                  }
                  {auth?.user?.role===3 && auth?.user?.role!==4 &&
                  <Dropdown.Item onClick={()=>{navigate('/transport/process')}}>
                  Find deals
                </Dropdown.Item>
                }
                {auth?.user?.role === 4 && <Dropdown.Item onClick={()=>{navigate('/manage-crops')}}>
                  Manage Crops
                </Dropdown.Item>}
                </Dropdown.Menu>

              </Dropdown>
              <li className="nav-item">
                {!auth?.user && (
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                )}
              </li>
              {auth?.user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
