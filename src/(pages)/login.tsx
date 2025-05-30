import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by verifying if the token exists in the localStorage
    const token = localStorage.getItem('token');
    if(token) {
      navigate('/');
    }
  }, [navigate])

  const login = async() => {
    // Check if email and password are provided, if not return early without sending a request
    if(!email || !password) {
      return;
    }
    // Send a POST request to the login endpoint with email and password, store the token in localStorage, and navigate to the home page
    try {
      const res = await axios.post('https://bootcamp2025.depster.me/login', {email, password}, {headers: {'Content-Type': 'application/json'}});
      localStorage.setItem('token', res.data.data.token);
      navigate('/');
    } catch (error) {
      console.error("Error logging in", error);
    }

  } 

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-center text-4xl'>Login</h1>
      <form className='flex flex-col gap-2 my-8'>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value)} className='border border-white px-2 py-1 w-[300px] rounded-lg' required/>
        <label htmlFor="password">Password:</label>
        <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} className='border border-white px-2 py-1 w-[300px] rounded-lg' required/>
        <input type="submit" value="Submit" onClick={(e) => {e.preventDefault();login()}} className="py-2 px-8 my-8 w-fit rounded-lg bg-[#6b6b6b] text-white hover:opacity-50 duration-300 cursor-pointer"/>
      </form>
    </div>
  )
}

export default Login;
