import { BrowserRouter,Routes,Route } from "react-router-dom";


import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Weather from "./components/Weather"
import ForgotPassword from "./components/ForgotPassword"
import './App.css';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/weather" element={<Weather />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
