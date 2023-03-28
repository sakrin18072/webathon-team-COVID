
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Transport from "./components/Transport";
import Orders from "./components/Orders";
import TransportProcessing from "./components/Transport/TransportProcessing";
import AcceptedOrders from "./components/Transport/AcceptedOrders";
import CropPrices from "./components/CropPrices";
import ManageCrops from "./components/ManageCrops";
import WeatherConditions from "./components/WeatherConditions";
function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/search/:text" element={<Search />}/>
        <Route path='/transport' element = {<Transport/>}/>
        <Route path='/orders' element = {<Orders/>}/>
        <Route path='/acceptedorders' element = {<AcceptedOrders/>}/>
        <Route path='/transport/process' element = {<TransportProcessing/>}/>
        <Route path='/crop-prices' element = {<CropPrices/>}/>
        <Route path='/manage-crops' element = {<ManageCrops/>}/>
        <Route path='/weather' element = {<WeatherConditions/>}/>
      </Routes>


    </div>
    </>
  );
}

export default App;
