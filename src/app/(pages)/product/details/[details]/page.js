"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const Details = ({ params }) => {
  const id = params.details;
  const [product, setProduct] = useState({});
  const [de, setDe] = useState();

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);

      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <>
  <h1>{product.name}</h1>
  <p>price: {product.price} Tk</p>
    <img src={product.image} alt={product.name} />
<div className="w-[100%]" dangerouslySetInnerHTML={{ __html: product.details }}></div>
  </>;
};

export default Details;
