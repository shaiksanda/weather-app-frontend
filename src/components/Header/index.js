
import "./index.css"
const Header = () => {
    console.log()
    return (
        <div className="header-container">
            <img alt="logo" className="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733554950/weather_logo_pqeait.png" />
            <div>
                <button className="login-button">Logout</button>
            </div>
        </div>
    )
}

export default Header;