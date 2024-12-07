
import { useState } from "react";
import { useNavigate, } from "react-router-dom"
import "./index.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleCheckbox = (event) => {
        setShowPassword(!showPassword)
    }

    const onSubmitSuccess = () => {
        setEmail("")
        setPassword("")
        navigate("/login")
    }

    const onHandleFailure = (errorMsg) => {
        setError(errorMsg)
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
            setError("")
        }, 5000)
    }

    const handleUpdatePassword = async (event) => {
        event.preventDefault()

        if (!password || !email) {
            setError("Please fill email and password");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError("");
            }, 5000);
            return; // Stop the next steps if validation fails
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError("");
            }, 5000);
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setError("Please enter a valid email address.");
            setShowError(true);
            return;
        }



        try {
            const url = "https://weather-app-backend-akva.onrender.com/forgotPassword"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess()
            }
            else {
                onHandleFailure(data.error_msg)
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
    return (
        <div className="app">
            <div>
                <img style={{ borderRadius: "8px" }} className="login-image" alt="login" src="https://image.freepik.com/free-vector/forgot-password-concept-isolated-white_263070-194.jpg" />
            </div>
            <form onSubmit={handleUpdatePassword} className="form">
                <label className="label" htmlFor="username">EMAIL</label>
                <input value={email} onChange={handleEmail} className="input" type="email" placeholder="EMIAL" id="username" />
                <label className="label" htmlFor="password">PASSWORD</label>
                <input value={password} onChange={handlePassword} className="input" type={showPassword ? "text" : "password"} placeholder="CRETAE NEW PASSWORD" id="password" />
                <div className="checkbox-container">
                    <div className="input-checkbox">
                        <input onChange={handleCheckbox} type="checkbox" id="checkbox" className="checkbox" />
                        <label htmlFor="checkbox" className="label" >Show Password</label>
                    </div>
                </div>
                <button type="submit" className="login-button">UPDATE PASSWORD</button>

                {showError && <p className="error-message">*{error}</p>}
            </form>
        </div>
    )
}

export default ForgotPassword;