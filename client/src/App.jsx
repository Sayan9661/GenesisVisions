import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { logo } from './assets';
import { Home,CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      
      {/* this is the header with logo and create img button */}
      <header className='w-full flex
    justify-between items-center bg-white 
    sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] '>
        
        <Link to="/">
          <img src={logo} alt="logo"
            className='w-28 object-contain' />
          </Link>
          <Link to="/create-post"
            className='font-inter font-medium
          bg-[#FC6C85] text-white px-4 py-2 rounded-md'>
            Create
          </Link>
        
      </header>
      


      {/* this is the for routing to different pages */}

      <main className='sm:p-8 px4 py-8 w-full
      bg-[#ffd1dc] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App