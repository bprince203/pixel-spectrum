import React, { useEffect, useState } from 'react';
import Features from '../components/Features';
import CategoryCard from '../components/CategoryCard';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import axios from 'axios';
import { category } from '../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [images, setImages] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  const handleOnChange = (e) =>{
    setSearchVal(e.target.value)
  }

  const handleKeyDown = (e)=>{
    if (e.key === "Enter" && searchVal.length > 0) {
      window.location.pathname = `/search/${searchVal}`
    }
  }

  useEffect(() => {
  const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/?client_id=81vAJbDHqAY4sF5lxsZteVJt4g-gqEHhYnBDoy4857c');
  
        // Ensure that 'response.data' is an array before setting state
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);
  

  return (
    <>
    <div className="hero-section">
      <div className="tagline pt-20">
      <h1 className='font-extrabold text-xl text-center md:text-4xl'>Elevate Your Vision</h1>
      <h1 className='font-extrabold text-xl text-center md:text-4xl'>Capture Your Imagination.</h1>
      </div>
      <div className="inp-search w-full md:w-2/3 mx-auto my-5 p-1 flex mt-20 items-center">
        <select name="search" id="search-term" className='outline-none  text-sm p-1 border-r border-[#999] bg-[#efefef] absolute text-black font-medium'>
          <option value="images">Images</option>
          <option value="images">Presets</option>
          <option value="images">PNG</option>
        </select>
        <input type="text" className='border w-full p-2 md:py-4 py-2 outline-none rounded-sm pl-24 bg-[#efefef]' placeholder='Search' onChange={handleOnChange} onKeyDown={handleKeyDown} value={searchVal}/>
      </div>
    </div>
    {/*  */}
    <Features/>
    {/* mid section */}
    <div className="mid-section container mx-auto my-2">
    <div className="section-title flex justify-between my-4">
      <h2 className='md:text-3xl px-3 text-xl font-semibold capitalize'>Popular stock footage categories</h2>
      <a href="/category" className='md:text-sm text-xs text-blue-700'>View All</a>
    </div>
    {/* category card */}
    <div className='flex gap-5 flex-wrap md:justify-start justify-center'>
      {category.map((data) => (
        <Link to={`category/${data.title}`} key={data.title}>
          <div className="category-box w-56 h-40 rounded-md bg-red-800 relative overflow-hidden">
            <img src={data.img} alt="" className='w-full h-full object-cover'/>
            <h2 className='absolute bottom-5 left-2 text-white text-xl'>{data.title}</h2>
          </div>
        </Link>
      ))}
    </div>
    {/* category card */}
    </div>

    {/* main-section */}
    <div className="main-section container mx-auto my-5 mt-20">
    <div className="section-title flex justify-between my-4">
      <h2 className='md:text-3xl px-3 text-xl font-semibold capitalize'>Latest Stocks</h2>
      <a href="/photo" className='md:text-sm text-sm text-blue-700'>View All</a>
    </div>
    <ImageGallery images={images}/>
    </div>
    {/* main-section */}
    {/* testimonials */}
    {/* <div className="container mx-auto my-5">
    <div className="section-title my-5">
      <h2 className='md:text-3xl text-2xl font-semibold capitalize text-center'>Testimonials</h2>
    </div>
    <Testimonials/>
    </div> */}
    {/* testimonials */}
    {/* footer */}
    <Footer/>
    {/* footer */}

  </>
  )
}
