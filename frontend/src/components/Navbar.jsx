import React, {useState} from 'react'
import {navLinks} from '../constants'
import { Link, NavLink } from 'react-router-dom';
function Navbar() {
  const [toggle, setToggle] = useState(false);
  const handleClick = ()=>{
    setToggle((prevToggle)=> !prevToggle);
  }
  return (
    <div>
      <nav className='p-3 border-b flex justify-between relative'>
        <a href="/"><h1 className='text-xl font-bold'>Pixel <span className='text-blue-700'> Spectrum</span></h1></a>
     
      <ul className='nav-list'>
        {navLinks.map((links)=>(
          <li key={links.id}><NavLink to={`${links.id}`}>{links.title}</NavLink></li>

        ))}
      </ul>
      <svg
        className="h-6 w-6 cursor-pointer side-button"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={handleClick}
      >
        <path d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>

      <div className={toggle ? "side-nav fixed right-0 top-0 w-full bg-blue-900 text-white p-4 block z-10":"side-nav fixed right-0 top-0 w-2/4 bg-blue-900 text-white p-4 h-full hide"}>
                    <svg
                className="h-6 w-6 float-right cursor-pointer"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={handleClick}
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>

      <ul className='w-full text-center flex flex-col gap-4 text-lg'>
      {navLinks.map((links)=>(
          <Link to={`../${links.id}`} key={links.id}>
             <li>{links.title}</li>
          </Link>

        ))}
      </ul>
      </div>
      </nav>
    </div>
  )
}

export default Navbar