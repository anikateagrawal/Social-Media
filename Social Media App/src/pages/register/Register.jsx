import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import axios from "axios";
import { useState } from 'react';

const Register = () => {

    const [inputs,setInputs]=useState({
        username:"",
        password:"",
        email:"",
        name:""
    });

    const navigate=useNavigate();

    const [err,setErr]=useState(null);

    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:7000/api/auth/register",inputs);
            navigate("/login");
        }
        catch(e){
            console.log(e);
            setErr(e);
        }
    }

  return (
    <div className='register'>
        <div className="card">
            <div className="left">
                <h1>Social Media.</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe architecto repellendus necessitatibus reprehenderit deserunt maiores rem illum quas aut.
                </p>
                <span>Do you have an account?</span>
                <Link to="/login">
                <button>Login</button>
                </Link>
                
            </div>
            <div className="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder='Username' name="username" onChange={handleInput} />
                    <input type="email" placeholder='Email' name="email" onChange={handleInput}/>
                    <input type="password" placeholder='Password' name="password" onChange={handleInput}/>
                    <input type="text" placeholder='Name' name="name" onChange={handleInput}/>
                    {err && err.response.data}
                    <button onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register