import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  console.log('sdfsdf')

  return (
   <>
   <Navbar/>

   <main className='min-h-screen'>
   <ToastContainer />
     <Outlet />
   </main>
     <Footer/>
     
   </>
  )
}

export default App
