import React from 'react'
import CategoryCard from '../components/CategoryCard'
import Footer from '../components/Footer'

function Category() {
  return (
    <>
    <div className='container mx-auto'>
        <h2 className='font-bold text-4xl mt-12'>Category</h2>
        <div className='my-10'>
        <CategoryCard/>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Category