import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate, Link,Navigate } from "react-router-dom"
import "./index.css"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleCheckbox = (e) => {
        setShowPassword(!showPassword)
    }


    const onSubmitSuccess = (jwtToken) => {
        Cookies.set("jwt_token", jwtToken)
        navigate("/weather")

    }
    const onSubmitError = (message) => {
        setError(message)
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
            setError("")
        }, 5000);
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setError("Both username and password are required");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError("");
            }, 5000);
            return; // Stop the next steps if validation fails
        }

        // if(password.length<6) {
        //     setError("Password must be at least 6 characters");
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //         setError("");
        //     }, 5000);
        //     return;
        // }


        try {
            const url = "https://weather-app-backend-akva.onrender.com/login"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }

            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess(data.jwtToken)
            }
            else {
                onSubmitError(data.error_msg)
            }
        }
        catch (error) {
            setError("server is Temporary down")
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
                setError("")
            }, 5000);
        }
    }

    const jwtToken=Cookies.get("jwt_token")
    if(jwtToken){
        return <Navigate to="/weather" />
    }


    return (
        <div className="app">
            <div>
                <img className="login-image" alt="login" src="https://pathwayport.com/saasland/images/login@4x.png" />
            </div>
            <form onSubmit={handleLogin} className="form">
                <label className="label" htmlFor="username">USERNAME</label>
                <input onChange={handleUsername} value={username} className="input" type="text" placeholder="USERNAME" id="username" />
                <label className="label" htmlFor="password">PASSWORD</label>
                <input value={password} onChange={handlePassword} className="input" type={showPassword ? "text" : "password"} placeholder="PASSWORD" id="password" />
                <div className="checkbox-container">
                    <div className="input-checkbox">
                        <input onChange={handleCheckbox} type="checkbox" id="checkbox" className="checkbox" />
                        <label htmlFor="checkbox" className="label" >Show Password</label>
                    </div>
                    <Link to="/forgot-password" style={{textDecoration:"none"}} ><p className="forgot-password">Forgot Password</p></Link>
                </div>
                <button type="submit" className="login-button">Login</button>
                <Link to="/register" style={{textDecoration:"none"}}><p style={{fontSize:"20px",fontWeight:"bold",margin:"2px"}}>Not Yet Registerd? Register Here</p></Link>
                {showError && <p className="error-message">*{error}</p>}
            </form>
        </div>
    )
}

export default Login;