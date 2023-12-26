"use client";
import { useEffect, useState } from "react";
import Carousels from "../components/Carousels";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.get("/api/category/categorys");
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  return (
    <>
      <Carousels />

      <div className="w-[100%] mt-12 flex justify-center">
        <div className="w-[100%] sm:w-[70%] grid grid-cols-3 sm:grid-cols-4 justify-center content-center gap-3">
          {category.map((data, index) => (
            <div className="place-self-center" key={index}>
              <CategoryCard cname={data.categoryname} img={data.image} />
            </div>
          ))}
        </div>
      </div>

      {products.length !== 0 ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 justify-center content-center gap-3">
          {products.map((data, index) => (
            <Card key={index} data={data}/>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
