import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import './login.scss'

const Login = () => {
    const {login}=useContext(AuthContext);

    const [inputs,setInputs]=useState({
        username:"",
        password:"",
    });

    const [err,setErr]=useState(null);

    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const navigate=useNavigate();
    const handleLogin=async (e)=>{
        e.preventDefault()
        try{
           await login(inputs);
            navigate("/");
        }
        catch(err){
            setErr(err);
        }
    }

  return (
    <div className='login'>
        <div className="card">
            <div className="left">
                <h1>Hello World.</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe architecto repellendus necessitatibus reprehenderit deserunt maiores rem illum quas aut.
                </p>
                <span>Don't you have an account?</span>
                <Link to="/register">
                    <button>Register</button>
                </Link>
                
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder='Username' name="username" onChange={handleInput}/>
                    <input type="password" placeholder='Password' name='password' onChange={handleInput}/>
                    {err && err.response.data}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login