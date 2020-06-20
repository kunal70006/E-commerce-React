import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'


const ProductManagement = () => {
  const [items, setItems] = useState([])
  const history = useHistory()

  useEffect( () => {
    let tempItems = []
    firebase
      .firestore()
      .collection('items')
      .where("sellerEmail", "==", localStorage.getItem("email"))
      .get().then( (snapshot) => {
        snapshot.forEach( (doc) => {
          const itemObj = {
            name: doc.data().name,
            price: doc.data().price,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            itemId: doc.id
          }
          tempItems.push(itemObj)
        })
      }).then( () => {
        setItems(tempItems)
      })
  })

  return(
    <div>
      <h2>Your listings: </h2>
      <div>
        {
          items.map( (item) => {
            return(
              <div 
                key={item.itemId}
              >
                <h4>Item name: {item.name} </h4>
                <h4>Item price: {item.price} </h4>
                <h4>Item description: {item.description} </h4>
                <h4>Item image: </h4>
                <img src={item.imageUrl} alt={item.name}/>
                <br />
                <button 
                  onClick={() => {
                    console.log("bruhhh")
                    history.push({
                      pathname: "/edit",
                      itemId: item.itemId
                    })
                  }}
                >Edit</button>
              </div>
            )
          })
        }
      </div> 
    </div>
  )
}

export default ProductManagement;