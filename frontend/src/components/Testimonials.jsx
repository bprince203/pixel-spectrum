import React from 'react'
import { testimonials } from '../constants'

function Testimonials() {
  return (
    <div className="testimonials-wrapp flex gap-3 flex-wrap justify-center px-4">
        {testimonials.map((data,index)=>(
              <div className="testimonials-box border p-4 max-w-96 hover:shadow-md cursor-pointer" key={index}>
              <i className="fa-solid fa-quote-right text-4xl text-cyan-500"></i>
              <p className='text-base'>{data.message}</p>
              <h3 className='font-semibold mt-1'>{data.admin}</h3>
              <p className='text-sm text-gray-600'>{data.post}</p>
              </div>
        ))}
    </div>
  )
}

export default Testimonials