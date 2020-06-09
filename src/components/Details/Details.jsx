import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

const Details = () => {

  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    sellerEmail: "",
    id: ""
  })

  const location = useLocation()

  useEffect( () => {
    setCurrentItem(location.currentItem)
  }, [location])

  return (
    <div className={styles.Details}>
      <Navbar />
      {/* {console.log(`${name} + ${price}`)} */}
      <h1>In details</h1>
      {/* <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
        tempora?
      </p> */}
      <h3>Item name: {currentItem.name}</h3>
      <h3>Item price: {currentItem.price}</h3>
      <h3>Item description: {currentItem.description}</h3>
      <h3>Seller email: {currentItem.sellerEmail}</h3>
      <img 
        src={currentItem.imageUrl} 
        alt={currentItem.name} 
      />
    </div>
  );
};

export default Details;
