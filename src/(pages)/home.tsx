import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  if(!token) {
    navigate('/register');
  }
  return (

    <div className='w-full flex flex-col justify-center items-center'>
      <h1>Home</h1>
    </div>
  )
}

export default Home;
