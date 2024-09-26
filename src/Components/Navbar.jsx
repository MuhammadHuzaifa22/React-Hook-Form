import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <div className='flex justify-between p-3 border-primary border-[1px]'><h1 className='text-3xl'>Navbar</h1><div className='flex gap-2'>  <Link to="/">
          <button className='border-[1px] border-primary p-1'>
            Login
          </button>
        </Link>  <Link to="/register">
          <button className='border-[1px] border-primary p-1'>
            Sign Up
          </button>
        </Link></div></div>
        

    </>
  )
}



export default Navbar