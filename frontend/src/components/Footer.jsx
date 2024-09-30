import React from 'react'

function Footer() {
  return (
    <footer className='p-4 bg-[#111] relative mt-4'>
        <div className="footer-wrap flex md:justify-evenly flex-wrap flex-row justify-start">
            <div className="footer-section p-2 max-w-xs">
                <div className="footer-heading">
                    <h3 className='font-bold text-white'>About Us</h3>
                    <p className='text-[#999]'>Download high-quality free and premium images from Pixel Spectrum for your projects. Explore spectrum of possibilities for your creative endeavors at Pixel Spectrum.</p>
                </div>
            </div>
            <div className="footer-section p-2">
                <div className="footer-heading">
                    <h3 className='font-bold text-white'>Links</h3>
                    <ul className='text-[#999]'>
                        <li><a href="/photo">Photos</a></li>
                        <li><a href="/category">Category</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-section p-2">
                <div className="footer-heading">
                    <h3 className='font-bold text-white'>Category</h3>
                    <ul className='text-[#999]'>
                        <li><a href="/category/Nature">Nature</a></li>
                        <li><a href="/category/Car">Car</a></li>
                        <li><a href="/category/Business">Business</a></li>
                        <li><a href="/category/Animals">Animals</a></li>
                    </ul>
                </div>
            </div>
        
        </div>
    </footer>
  )
}

export default Footer