import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ImageGallery from '../components/ImageGallery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { searchFilter } from '../constants';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Photo() {
  const [images, setImages] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);

  document.addEventListener('scroll',()=>{
    console.log(screen);
  })
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
    {/* page seo  */}
    <Helmet>
        <title>Pixel Spectrum | Photo</title>
        <meta name="description" content="Your page description" />
    </Helmet>
    {/* page seo  */}
    <div className='container mx-auto w-full relative'>
    <div className="section-title flex justify-between my-4 items-center p-2 border-b relative">
        <div className="search-wrapp flex md:w-2/5 gap-2 w-full">
        <input type="text" className='p-2 outline-none w-full bg-gray-100' placeholder='Type here to search'/>
        <button type="button" className='bg-black text-white px-4 text-sm rounded-sm hover:bg-gray-900 transition-all'>Search</button>
        </div>
        <span href="#" id='filter-btn' className='text-sm text-black bg-slate-100 rounded-sm p-2 ml-2 cursor-pointer' onClick={()=> setToggleSearch(!toggleSearch)}>
        <i className="fa-solid fa-filter"></i> <span className='md:inline-block hidden'>Filter</span></span>

        {toggleSearch && (
           <div className="search-filter-box absolute right-2 top-full bg-white rounded-sm border max-w-2/12 z-10" id='search-filter'>
           <ul className='text-sm'>
 
             {searchFilter.map((data,index)=>(
               <li className='border-b cursor-pointer hover:bg-gray-100 p-2' key={data.id}>{data.title}</li>
             ))}
 
           </ul>
         </div>
        )}
    </div>

    <div className="search-result-count px-2 mb-2">
      {/* search keyword */}
        <p className='text-gray-400 font-light text-xs'>Showing <span className='font-medium'>{images && (images.length)}</span> results</p>
    </div>

    {/* handling images */}
    <ImageGallery images={images}/>
    
    </div>
    {/* footer */}
    <Footer/>
    </>
  )
}

export default Photo