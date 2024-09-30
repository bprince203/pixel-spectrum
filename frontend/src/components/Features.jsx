import React from 'react'
import { features } from '../constants'
import { Link } from 'react-router-dom'

function Features() {
  return (
    <div className='features flex my-10 w-2/3 mx-auto justify-evenly items-center flex-wrap relative bottom-0 gap-4'>
      {features.map((feature,index)=>(
        <Link to={feature.link} key={index}>
      <div className="features-box flex items-center gap-3 p-2 cursor-pointer my-4">
        <div className="box-icon">
        <i className={`${feature.icon} text-4xl text-blue-600`}></i>
        </div>
        <div className="box-content">
          <h2 className='font-medium text-lg'>{feature.title}</h2>
          <p className='text-[#999]'>{feature.tag}</p>
        </div>
    </div>
    </Link>
      ))}
    </div>
  )
}

export default Features