import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

const Details = (props) => {

  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    sellerEmail: "",
    id: ""
  })

  const location = useLocation()

  useEffect( () => {
    setItem(location.state.item)
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
      <h3>Item name: {item.name}</h3>
      <h3>Item price: {item.price}</h3>
      <h3>Item description: {item.description}</h3>
      <h3>Seller email: {item.sellerEmail}</h3>
      <img 
        src={item.imageUrl} 
        alt={item.name} 
      />
    </div>
  );
};

export default Details;
