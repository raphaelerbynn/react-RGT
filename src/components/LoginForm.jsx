import React, { useContext, useState } from "react";
import "../style/LoginForm.css";
import { AuthContext } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({email: "", password:""});
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            const success = await login(formData.email, formData.password);
            console.log(success)
            if (success) {
                alert("Logged in");
                navigate('/dashboard', {replace: true});
            }else{
                alert('Invalid username or password');
            }
          } catch (err) {
            // alert({ message: 'Invalid username or password' });
            console.error(err);

          }      
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((data) => ({...data, [name]: value}));
    }

    return (
        <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <form className="form" onSubmit={handleSubmit}>
            <label className="label">
            Email
            </label>
            <input type="email" name="email" className="input" onChange={handleChange}/>

            <label className="label">
            Password
            </label>
            <input type="password" name="password" className="input" onChange={handleChange}/>

            <button type="submit" className="button">
            Login
            </button>
        </form>
        </div>
    );
}

export default LoginForm;
