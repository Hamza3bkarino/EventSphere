
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './Pages/Admin/Admin'
import { Toaster } from "react-hot-toast";
import Home from './Pages/Home'
import Navbar from './Components/NavBar'
import Events from './Pages/Events';
import CartSidebar from './Components/CartSidebar';
import Checkout from './Pages/Checkout';


function App() {

  return (
    <>

      <Toaster position="top-right" />

      <Navbar/>
      <BrowserRouter>
        <CartSidebar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/admin/Dashboard' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
