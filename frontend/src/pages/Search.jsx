import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { searchFilter } from '../constants';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton' 

function Search() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false);
  const { keyword } = useParams() || null;

  useEffect(() => {
    if (keyword !== null) {
      // setSearchInput(keyword);
      fetchImages();
    }
  }, [keyword]);

  const handleSearch = async () => {
    if (searchInput.trim().length > 0) {
    window.location.replace(searchInput)

    }
  };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
        params: {
        client_id: '81vAJbDHqAY4sF5lxsZteVJt4g-gqEHhYnBDoy4857c', //Unplash api access key
        },
        });
          // Ensure that 'response.data' is an array before setting state
          console.log(response.data)
          if (Array.isArray(response.data.results)) {
            setImages([...images, ...response.data.results]);
            if (response.data.results <=0) {
              setMessage("No Images Found")
            }
          } else {
            console.error('Unexpected API response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching images:', error);
        }
    };

  return (
    <>
      {/* Page SEO */}
      <Helmet>
        <title>Pixel Spectrum | Search</title>
        <meta name="description" content="Your page description" />
      </Helmet>
      {/* Page SEO */}

      <div className="container mx-auto w-full relative min-h-[100vh]">
        {/* header */}
      <div className="section-title flex justify-between my-4 items-center p-2 border-b relative">
        <div className="search-wrapp flex md:w-2/5 gap-2 w-full">
        <input type="text" className='p-2 outline-none w-full bg-gray-100' placeholder='Type here to search' onChange={(e)=> setSearchInput(e.target.value)}/>
        <button type="button" className='bg-black text-white px-4 text-sm rounded-sm hover:bg-gray-900 transition-all' onClick={handleSearch}>Search</button>
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
        <p className='text-gray-400 font-light text-xs'>{keyword && `Showing result for `}<span className='font-medium'>{keyword}</span></p>
    </div>
        {/* header */}

        {/* Handling images */}
        {keyword ? '':<h1 className='font-semibold text-center mt-8 text-gray-400'>Type Keyword to search</h1>}
        {message}
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
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Search;
