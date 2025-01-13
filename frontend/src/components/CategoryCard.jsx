import React from 'react';
import CategoryImage from '../assets/back.jpg';
import { category } from '../constants';
import { Link } from 'react-router-dom';

function CategoryCard() {
  return (
    <div className='flex gap-5 flex-wrap justify-center'>
      {category.map((data) => (
        <Link to={data.title} key={data.title}>
          <div className="category-box w-56 h-40 rounded-md relative overflow-hidden">
            <img src={data.img} alt="" className='w-full h-full object-cover'/>
            <h2 className='absolute bottom-5 left-2 text-white text-xl'>{data.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryCard;
