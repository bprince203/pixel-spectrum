import React from 'react'
import { sideNavLinks } from '../constants'
import { NavLink } from 'react-router-dom'

function SideNav() {
  return (
    <div className='bg-[#11101d] w-[200px] fixed h-screen'>
      <div className="sidebar-heading flex justify-between p-2">
        <h2 className='text-white font-bold'>Pixel Spectrum</h2>
        <svg
        className="h-6 w-6 cursor-pointer text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
      </div>
      <div className="sideBar-links">
        <ul className='nav-links text-white' id='sideNav'>
          {sideNavLinks.map((data,index)=>(
          <li key={index} className='my-5 px-4'><NavLink to={`/dashboard/${data.id}`}><i className={`${data.icon} mx-2`}></i> {data.title}</NavLink></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideNav