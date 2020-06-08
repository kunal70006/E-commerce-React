import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../../components";
import styles from "./Shop.module.css";
import firebase from '../../Firebase'

const Shop = () => {
  const history = useHistory();
  const [items, setItems] = useState([])
  // const items = [
  //   {
  //     name: "coin 2",
  //     desc: "lorem ipsum hurr durr brr",
  //     price: 70,
  //   },
  //   {
  //     name: "coin 3",
  //     desc: "lorem ipsum hurr durr brr",
  //     price: 71,
  //   },
  //   {
  //     name: "coin 4",
  //     desc: "lorem ipsum hurr durr brr",
  //     price: 72,
  //   },
  //   {
  //     name: "coin 5",
  //     desc: "lorem ipsum hurr durr brr",
  //     price: 73,
  //   },
  //   {
  //     name: "coin 6",
  //     desc: "lorem ipsum hurr durr brr",
  //     price: 74,
  //   },
  //   {
  //     name: "coin 7",
  //     desc: "lorem ipsum hurr durr brr ajdojsdsadkjasdljsalddsadad",
  //     price: 75,
  //   },
  // ];

  const tempItems = []

  useEffect( () => {
    firebase.auth().onAuthStateChanged( (user) => {
      if (!user) {
        history.push('/login')
      } else {
        firebase.firestore().collection('items').get().then( (docs) => {
          docs.forEach( (doc) => {
            const itemObj = {
              name: doc.data().name,
              price: doc.data().price,
              description: doc.data().description,
              imageUrl: doc.data().imageUrl,
              sellerEmail: doc.data().sellerEmail,
              id: doc.id
            }
            tempItems.push(itemObj)
          })
        }).then( () => {
          setItems(tempItems)
        })
      }
    })    
  }, [])

  const Details = ({ name, price }) => {
    return (
      <div className={styles.Details}>
        <Navbar />
        {console.log(`${name} + ${price}`)}
        <h1>In details</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          tempora?
        </p>
      </div>
    );
  };

  return (
    <div className={styles.Shop}>
      <Navbar />
      <div className={styles.title}>Antique Coins</div>
      <div className={styles.container}>
        {items.map((item) => {
          return (
            <div key={item.id} className={styles.cardContainer}>
              <div
                className={styles.card}
                onClick={() => <Details name={item.name} price={item.price} />}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.image}
                />
                <div className={styles.aboutCardContainer}>
                  <h4>{item.name}</h4>
                  {/* <p className={styles.desc}>{item.description}</p> */}
                  <p className={styles.price}>${item.price}</p>
                  <button className={styles.toCartBtn}>Add to cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
