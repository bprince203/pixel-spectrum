import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import CategoryImage from '../assets/back.jpg';
import '../ImageGallery.css'
import axios from 'axios'
import { searchFilter } from '../constants';

function CategoryDetails() {
    const { catname } = useParams();
    const [images, setImages] = useState([]);
    const [toggleSearch, setToggleSearch] = useState(false);
    useEffect(() => {
       const fetchImageByCategory = async()=>{
        try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=4&query=${catname}`, {
        params: {
        client_id: '81vAJbDHqAY4sF5lxsZteVJt4g-gqEHhYnBDoy4857c', //Unplash api access key
        },
        });
          // Ensure that 'response.data' is an array before setting state
          console.log(response.data)
          if (Array.isArray(response.data.results)) {
            setImages([...images, ...response.data.results]);
          } else {
            console.error('Unexpected API response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching images:', error);
        }
    }
    fetchImageByCategory();
    }, []);
   
  return (
   <>
   <div className="container mx-auto min-h-screen">
   <div className="section-title flex justify-between my-4 items-center">
   <h2 className='font-medium text-xl'>Category: <span>{catname}</span></h2>
   <div className='flex items-center flex-wrap relative'>
    {/* <label htmlFor="search-inp" className='bg-gray-100 flex items-center'><i className="fa-solid fa-magnifying-glass pl-2"></i><input type="text" className='bg-gray-100 p-2 outline-none' placeholder='Type here to search'/></label> */}
    <span href="#" id='filter-btn' className='text-sm text-black bg-slate-100 rounded-sm p-2 ml-2 cursor-pointer rea' onClick={()=> setToggleSearch(!toggleSearch)}>
        <i className="fa-solid fa-filter"></i> Filter</span>

        {toggleSearch && (
           <div className="search-filter-box absolute min-w-40 right-0 top-full bg-white rounded-sm border max-w-2/12 z-10" id='search-filter'>
           <ul className='text-sm'>
 
             {searchFilter.map((data,index)=>(
               <li className='border-b cursor-pointer hover:bg-gray-100 p-2' key={data.id}>{data.title}</li>
             ))}
 
           </ul>
         </div>
        )}
   </div>
    </div>
    {/* showing images */}
    <div className="parent">
      {images.map((image,index)=>(
         <div className="image-area" key={index}>
          <Link to={`/photo/${image.id}`}>
         <img src={image.urls.regular} alt={'Hello'} />
         <div className="image-layer">
           <div className="layer-head text-white flex justify-between  items-center p-2">
           <i className="fa-solid fa-heart"></i>
             <p>{image.title}</p>
           </div>
           <div className="layer-bottom text-white flex justify-between p-2">
             <i className='fa-solid fa-download'></i>
           </div>
         </div>
         </Link>
       </div>
      ))}
          
    </div>
 
   </div>
   <Footer/>
   </>
  )
}

export default CategoryDetails