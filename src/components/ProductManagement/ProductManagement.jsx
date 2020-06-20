import React, { useState } from 'react'
import firebase from 'firebase'
import { storage } from 'firebase'
import { useEffect } from 'react'


const ProductManagement = () => {
  const [items, setItems] = useState([])

  useEffect( () => {
    firebase
      .firestore()
      .collection('items')
      .where("sellerEmail", "==", localStorage.getItem("email"))
      .onSnapshot( (snapshot) => {
        setItems([])
        snapshot.forEach( (doc) => {
          const itemObj = {
            name: doc.data().name,
            price: doc.data().price,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
          }
          setItems( (items) => [...items, itemObj])
        })
      })
  })

  const editItem = (event, item) => {
    
  }

  return(
    <div>
      <h2>Your listings: </h2>
      <div>
        {
          items.map( (item) => {
            return(
              <div>
                <h4>Item name: {item.name} </h4>
                <h4>Item price: {item.price} </h4>
                <h4>Item description: {item.description} </h4>
                <h4>Item image: </h4>
                <img src={item.imageUrl} alt="gtfo"/>

                <button onClick={(event) => editItem(event, item)}>Edit</button>
              </div>
            )
          })
        }
      </div> 
    </div>
  )
}

export default ProductManagement;