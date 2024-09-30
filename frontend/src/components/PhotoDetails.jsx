import React, { useEffect, useState } from 'react'
import Nature from '../assets/back.jpg'
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import RelatedImages from './RelatedImages';
import Skeleton from 'react-loading-skeleton';

function PhotoDetails() {
  const {id} = useParams();
  const [imageData, setImageData] = useState([]);
  const [fullView, setFullView] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0,0)
    setLoading((true))
  fetchImageById();
  }, [id]);

  const fetchImageById = async()=>{
    try {
    const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    params: {
    client_id: '81vAJbDHqAY4sF5lxsZteVJt4g-gqEHhYnBDoy4857c', //Unplash api access key
    },
    });
      // Ensure that 'response.data' is an array before setting state
      console.log(response.data)
      setImageData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
}

const handleFullView = () => {
  setFullView(!fullView);

  // Prevent scrolling when in full view
  if (!fullView) {
    document.body.style.overflow = "hidden";
    // document.addEventListener('scroll', preventDefaultScroll, { passive: false });
  } else {
    document.body.style.overflow = "auto"; // Reset to default
  }
};

  // const handleDownload = async () => {
  //   try {
  //     // Step 1: Trigger download event
  //     await axios.get(`https://api.unsplash.com/photos/${id}/download`, {
  //       headers: {
  //         Authorization: 'Client-ID 54415081vAJbDHqAY4sF5lxsZteVJt4g-gqEHhYnBDoy4857c',
  //       },
  //     });

  //     // Step 2: Open the image in a new tab for the user to download
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = imageData.urls.full;
  //     downloadLink.download = 'downloaded_image.jpg';
  //     downloadLink.click();
  //   } catch (error) {
  //     console.error('Error downloading image:', error);
  //   }
  // };

  return (
    <>
    <div className="container mx-auto my-4 min-h-screen">
      {loading ? (
        <>
        <div className="image-wrapper flex gap-4 flex-wrap justify-center flex-col md:flex-row px-4">
          <div className="box relative basis-2/4 h-96">
            <Skeleton className='w-full h-60'/>
          </div>
          <div className="box basis-2/6 flex flex-col">
            <Skeleton className='w-full h-10'/>
            <span className='flex gap-4 my-2'>
            <p className='w-10'><Skeleton/></p>
            <p className='w-10'><Skeleton/></p>
            <p className='w-10'><Skeleton/></p>
            <p className='w-10'><Skeleton/></p>
            </span>

            <p className='w-40'><Skeleton height={35}/></p>
            <p className='w-40'><Skeleton height={35}/></p>
          
          </div>
        </div>
        </>
      ):(
        <>
        {imageData.id && (
        <div className="image-details-area flex justify-between p-2 gap-2 flex-wrap md:flex-row flex-col">
        <div className="imagebox basis-[68%] relative border">
          <i className='fa-solid fa-expand bg-[#1111112f] px-2 py-1 absolute bottom-0 right-2 text-white text-4xl cursor-pointer' onClick={handleFullView}></i>
          <img src={imageData.urls.full} alt="" className='w-full h-96 image-animate'/>
        </div>
        <div className="image-details basis-[30%] min-w-72">
          <h2 className='font-medium text-2xl capitalize'>{imageData.alt_description || <Skeleton />}</h2>
          <ul className='tag'>
            {imageData.tags.map((data)=>(
              <li key={data.title}>{data.title}</li>
            ))}
          </ul>
          <div className="button-area my-4">
          {/* <button onClick={handleDownload}>Download Image</button> */}
            <a href={imageData.links.download} target='_blank' className='px-4 py-2 bg-black text-white rounded-md my-10 hover:scale-95 transition-all'><i className='fa-solid fa-download'></i> Download</a>
          </div>

        </div>

          {fullView && (
             <div className="full-screen-view bg-[#11111175] h-screen w-screen fixed top-0 left-0 z-10 flex justify-center items-center">
             <div className="full-image-area max-w-[98%] bg-white p-2 relative">
             <i className='fa-solid fa-xmark z-20 bg-[#efefef] text-black cursor-pointer py-1 px-2 absolute right-3 top-3 opacity-20 hover:opacity-100' onClick={()=>{
              document.body.style.overflow = "auto";
              setFullView(!fullView)
             }}></i>
               <img src={imageData.urls.full} alt="" className='w-full h-96 object-contain'/>
             </div>
           </div>
          )}
       

      </div>
      )}
        </>
      )}
      

      <div className="related-images">
        <h2 className='font-bold text-4xl my-4'>Related Images</h2>
        <RelatedImages query={imageData.id && imageData.tags[0]}/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default PhotoDetails