import React, { useState } from "react";
import "../auth.form.scss"
import {useNavigate,Link, useSearchParams} from "react-router"
import { useAuth } from "../hooks/useAuth";
import BrandLogo from "../../../components/BrandLogo";


const Login = () =>{

    const {loading, handleLogin} = useAuth()


    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (<main className="auth-page">
            <header className="auth-brand"><BrandLogo /></header>
            <h1>Loading......</h1>
        </main>)
    }

    return (    
        <main className="auth-page">
            <header className="auth-brand"><BrandLogo /></header>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter  email address" 
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                        
                        />
                    </div>

                    <button className= "button primary-button" type="submit" >Login</button>

                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link>  </p>
            </div>
        </main>
    )
}

export default Login;