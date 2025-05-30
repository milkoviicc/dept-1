import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Register from "./(pages)/register"
import Login from "./(pages)/login"
import Home from "./(pages)/home"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
