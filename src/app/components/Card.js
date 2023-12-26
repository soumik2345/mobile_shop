import Link from 'next/link';
import React from 'react'

const Card = ({data}) => {
    const {name,image,price,_id} = data;
  return (
<div className="card w-80 bg-base-100 shadow-xl">
  <figure><img src={image} className='w-20' alt={name} /></figure>
  <div className="card-body">
    <Link href={`/product/details/${_id}`} className="card-title">{name}</Link>
    <p>price: {price} Tk</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add to card</button>
    </div>
  </div>
</div>
  )
}

export default Card;