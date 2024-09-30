import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../ImageGallery.css'

function RelatedImages({query}) {
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    console.log(images)
    useEffect(() => {
        if (query) {
        fetchImages()
        }
    }, [query]);
    const fetchImages = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query.title}`, {
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
    <div className='parent'>
        {message}
        {images.map((image, index)=>(
          <div className="image-area" key={index}>
            <Link to={`/photo/${image.id}`}>
            <img src={image.urls.regular} alt={image.urls.small} />
            <div className="image-layer">
              <div className="layer-head text-white flex justify-between  items-center p-2">
              <i className="fa-solid fa-heart"></i>
                <p>{image.alt_description}..</p>
              </div>
              <div className="layer-bottom text-white flex justify-between p-2">
                <i className='fa-solid fa-download'></i>
              </div>
            </div>
            </Link>
          </div>
          
      ))}
         
        </div>
  )
}

export default RelatedImages