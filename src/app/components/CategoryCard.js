import Link from 'next/link';
import React from 'react'

const CategoryCard = (props) => {
    const {cname,img} = props;
  return (
    <Link href={`/product/category/${cname}`} className='h-24 w-24 bg-slate-800 flex justify-center items-center flex-col rounded-full'>
        <img src={`${img}`} alt="logo" className='h-8'/>
        <p>{cname}</p>
    </Link>
  )
}

export default CategoryCard;