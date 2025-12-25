
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './Pages/Admin/Admin'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
    
      <Toaster position="top-right" />

    {/* <Navbar/>
      <Home/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/admin/Dashboard' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
