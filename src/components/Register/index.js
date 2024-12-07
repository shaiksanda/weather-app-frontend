// import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate, Link,Navigate
    
 } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Register = () => {
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")

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

    const handleFullname = (e) => {
        setFullname(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }


    const onSubmitSuccess = () => {
        setUsername('');
        setPassword('');
        setFullname('');
        setEmail('');
        setGender('');
        navigate("/login")

    }
    const onSubmitError = (message) => {
        setError(message)
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
            setError("")
        }, 5000);
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!username || !password || !email || !gender || !fullname) {
            setError("Please fill all fields");
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
            const url = "https://weather-app-backend-akva.onrender.com/register"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, email, fullname, gender })
            }

            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess()
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
                <img className="login-image" alt="login" src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-login-4489366-3723273.png" />
            </div>
            <form onSubmit={handleRegister} className="form">
                <label className="label" htmlFor="fullname">FULLNAME</label>
                <input onChange={handleFullname} value={fullname} className="input" type="text" placeholder="FULLNAME" id="fullname" />
                <label className="label" htmlFor="username">USERNAME</label>
                <input onChange={handleUsername} value={username} className="input" type="text" placeholder="USERNAME" id="username" />
                <label className="label" htmlFor="email">EMAIL</label>
                <input onChange={handleEmail} value={email} className="input" type="email" placeholder="EMAL" id="email" />
                <label className="label" htmlFor="gender">GENDER</label>
                <select onChange={(e) => setGender(e.target.value)} className="input" id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <label className="label" htmlFor="password">PASSWORD</label>
                <input value={password} onChange={handlePassword} className="input" type={showPassword ? "text" : "password"} placeholder="PASSWORD" id="password" />
                <div className="checkbox-container">
                    <div className="input-checkbox">
                        <input onChange={handleCheckbox} type="checkbox" id="checkbox" className="checkbox" />
                        <label htmlFor="checkbox" className="label" >Show Password</label>
                    </div>
                </div>
                <button type="submit" className="login-button">Register</button>
                <Link to="/login" style={{ textDecoration: "none" }}><p style={{ fontSize: "20px", fontWeight: "bold", margin: "2px" }}>Already Registerd? LogIn</p></Link>
                {showError && <p className="error-message">*{error}</p>}
            </form>
        </div>
    )
}

export default Register;