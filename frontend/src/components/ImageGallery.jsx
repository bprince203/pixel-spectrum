import React from 'react';
import '../ImageGallery.css'
import { Link } from 'react-router-dom';

const ImageGallery = ({ images }) => {
  return (
    <>
    <div className="parent">
      {console.log(images)}
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
    
    </>
  );
};

export default ImageGallery;
