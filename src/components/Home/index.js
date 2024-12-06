import { Link } from "react-router-dom";
import "./index.css"
const Home = () => {
    console.log()
    return (
        <div className="app">
            <div className="home-left-container"> 
                <h1 className="weather-heading">Your Weather Companion</h1>
                <p className="weather-content">Experience the weather like never before. Get accurate, real-time updates for any location and plan your day with confidence.</p>
                <Link to="/login"><button type="button" className="login-button" style={{marginBottom:'10px'}}>Login</button></Link>
                <Link to="/register"><button type="button" className="login-button">Register</button></Link>
            </div>
            <div>
                <img className='weather-image' src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733481624/weather_app_image_o90z8u.jpg" alt="weather" />
            </div>
            <div>
            <img className="weather-image-1" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733483037/weather_image_1_dxxoln.webp" alt="weather"  />
            </div>
        </div>
    )
}

export default Home;