import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import Image from '../assets/back.jpg';
import axios from 'axios'

const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Post() {
    const [toggle, setToggle] = useState(false);
    const [postData, setPostData] = useState([]);
    const [postFetchMessage, setPostFetchMessage] = useState('');
    const [addPostData, setAddPostData] = useState({
      slug: '',
      postImg: '',
      postTitle: '',
      postDesc: '',
      tags: '',
      category: ''
    });

    // fetch post data
    const fetchPostData = async()=>{
        try {
            const response = await axios.get(`${api_url}/api/auth/post/fetch-posts`,{withCredentials:true})
            if (response.status === 200) {
                console.log(response.data);
                if (response.data.length <=0) {
                    setPostFetchMessage("No Post Found")
                }
                return setPostData(response.data)
            }
        } catch (error) {
            
        }
      }
  
    const handleOnChange = (e) => {
        if (e.target.name === 'postImg') {
            // If the event is from the file input, store the file object
            setAddPostData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
          } else {
            // Otherwise, handle other inputs normally
            setAddPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          }
        }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const formData = new FormData();
        formData.append('slug', addPostData.slug);
        formData.append('postImg', addPostData.postImg);
        formData.append('postTitle', addPostData.postTitle);
        formData.append('postDesc', addPostData.postDesc);
        formData.append('tags', addPostData.tags);
        formData.append('category', addPostData.category);
  
        const response = await axios.post(`${api_url}/api/auth/post/add-post`, formData, {withCredentials:true});
  
        if (response.status === 200) {
          // Handle success, update state or perform other actions
          console.log('File uploaded successfully',response.data);
        fetchPostData();
        } else {
          // Handle failure
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    };
  
    useEffect(() => {
      document.body.style.backgroundColor = '#E4E9F7';
      fetchPostData();
    }, []);
  

  return (
    <>
      <SideNav />
      <div className='dashboard-main w-[calc(100%-200px)] left-[200px] relative p-2 h-screen'>
        <h2 className='font-bold text-2xl'>Posts</h2>

        <div className="dashboard-header flex gap-4 flex-wrap my-4">
          <div className="header-box bg-white p-4 min-w-40 rounded-md">
            <h3 className='font-medium'>Total Posts: {postData.length}</h3>
          </div>
        </div>

        {/* add post btn */}
        <div className="post-action-btn flex">
          <button type="button" className='bg-[#11101d] px-2 py-2 rounded-sm text-white font-medium text-sm' onClick={() => setToggle(true)}>Add Post</button>
        </div>

        {/* post list */}
        <div className="dashboard-post-list bg-white rounded-sm px-4 py-2 flex flex-col my-4">
            <p className='text-center '>{postFetchMessage}</p>
            {postData && (
                <>
                {postData.map((data,index)=>(

                        <div className="post-list-box flex gap-4 justify-between items-center flex-wrap border-b py-2" key={index}>
                        <div className="list-img flex gap-4 flex-wrap">
                          <div className="list-count">{index+1}</div>
                          <img src={`${api_url}/${data.urls}`} alt="" className='w-80 h-40 hover:object-contain object-cover rounded-md transition-all cursor-pointer' />
                          <div className="img-details max-w-90">
                            {/* post title */}
                            <p className='font-normal text-xl'>{data.title}</p>
                            {/* tags */}
                            <span className='text-xs flex items-center'>Tags :
                            <ul className='tag'>
                                {data.tags.map((tag,index)=>(
                                    <li key={index}>{tag}</li>
                                ))}
                            </ul>
                            </span>
                            {/* category */}
                            <span className='text-xs flex items-center'>Category :
                            <ul className='tag'>
                                {data.category.map((categoryName,index)=>(
                                    <li key={index}>{categoryName}</li>
                                ))}
                            </ul>
                            </span>

                          </div>
                        </div>
                        <div className="list-action flex flex-col gap-2">
                          <a href="#"><i className="fa-solid fa-pen-to-square"></i> Edit</a>
                          <a href="#"><i className='fa-solid fa-trash'></i> Delete</a>
                        </div>
                      </div>

                ))}
                </>
            )}
        </div>
        {/* add post form */}
        {toggle && (
          <div className="add-post-box absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="add-post-area bg-white border p-4 w-2/3">
              <i className='fa-solid fa-xmark float-right p-1 cursor-pointer bg-gray-200' onClick={() => setToggle(false)}></i>
              <h1 className='font-medium text-2xl mb-2'>Add Post</h1>
              <form method='post' encType='multipart/form-data' className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
              
                <input type="file" onChange={handleOnChange} name="postImg" id="postImg" accept=".jpg, .jpeg, .png" className='my-2' />
                <select name="category" id="" className='w-2/12' onChange={handleOnChange} value={addPostData.category} required>
                    <option value="">--select category--</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="nature">Nature</option>
                    <option value="animals">Animals</option>
                </select>
                <input type="text" onChange={handleOnChange} value={addPostData.postTitle} name='postTitle' className='border outline-none p-2' id='post-title' placeholder='Post title here' />

                <input type="text" onChange={handleOnChange} value={addPostData.slug} name='slug' className='border outline-none p-2' id='post-slug' placeholder='Post Slug here' />

                <input type="text" onChange={handleOnChange} value={addPostData.tags} name='tags' className='border outline-none p-2' id='post-keyword' placeholder='Add keywords' />
                
                <textarea name="postDesc" onChange={handleOnChange} value={addPostData.postDesc} id="postDesc" cols="20" rows="5" className='border outline-none p-2' placeholder='Post Description here..'></textarea>
                <button type="submit" className='w-60 bg-[#11101d] p-2 text-white rounded-sm'>Upload</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;