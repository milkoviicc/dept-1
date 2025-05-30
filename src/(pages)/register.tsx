import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registered, setRegistered] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() =>{
    navigate(registered ? '/login' : '/register');
  }, [registered, navigate])

  const registerAcc = async() => {

    if(!email || !password) {
      return;
    }
    try {
      const res = await axios.post('https://bootcamp2025.depster.me/registration', {email, password});

      if(res.status === 201) {
        alert("Account registered successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error registering account:", error);
    }
  } 

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-center text-4xl'>Register an account!</h1>
      <form className='flex flex-col gap-2 my-8'>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value)} className='border border-white px-2 py-1 w-[300px] rounded-lg' required/>
        <label htmlFor="password">Password:</label>
        <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} className='border border-white px-2 py-1 w-[300px] rounded-lg' required/>
        <input type="submit" value="Submit" onClick={(e) => {e.preventDefault();registerAcc()}} className="py-2 px-8 my-8 w-fit rounded-lg bg-[#6b6b6b] text-white hover:opacity-50 duration-300 cursor-pointer"/>
      </form>
      <p>Have an account? <button onClick={() => setRegistered((prev) => !prev)}>Log in!</button></p>
    </div>
  )
}

export default Register;
