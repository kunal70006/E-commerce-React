import React, { useState, useEffect } from 'react'
import styles from './UploadItem.module.css'
import { storage } from '../../Firebase'
import firebase from '../../Firebase'
import Navbar from '../Navbar/Navbar'
import TextareaAutosize from 'react-textarea-autosize';

const UploadItem = () => {

  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [progress, setProgress] = useState(0)

  const [itemName, setItemName] = useState(null)
  const [itemPrice, setItemPrice] = useState(null)
  const [itemDescription, setItemDescription] = useState(null)
    
  const selectImage = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    const uploadTask =  storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progress function
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) 
      setProgress(progress)
    }, 
    (error) => {
      //error handler
      alert(error.code + error.message)
    }, 
    () => {
      //completion function
      storage.ref('images').child(image.name).getDownloadURL().then( (url) => {
        const itemObj = {
          name: itemName,
          price: itemPrice,
          description: itemDescription,
          imageUrl: url,
          sellerEmail: firebase.auth().currentUser.email
        }

        firebase
          .firestore()
          .collection('items')
          .add(itemObj)
      })
    })
  }

  useEffect( () => {
    
  }, [])

  return (
    <div className={styles.uploadItem}>
      <Navbar />
      <form className={styles.itemUploadForm}>
        <label className={styles.titleLabel}>Upload an Item</label>
        <input 
          type="text" 
          placeholder="Enter name of item" 
          className={styles.textFields}
          onChange={(event) => {
            setItemName(event.target.value)
          }}
        />

        <input 
          type="text" 
          placeholder="Enter price of the item" 
          className={styles.textFields}
          onChange={(event) => {
            setItemPrice(event.target.value)
          }} 
        />

        <TextareaAutosize
          inputRef={(tag) => {
            this.textarea = tag
            this.textarea.focus()
          }}
          minRows={2}
          placeholder="Enter description (max 100 chars)"
          maxLength={100}
          className={styles.textFields}
          onChange={(event) => {
            setItemDescription(event.target.value)
          }}
        />
        <div className={styles}>
          <label className={styles.imageUploadLabel}>Click browse button to upload an image</label>
          <input 
            type="file" 
            accept="image/*" 
            className={styles.imageSelector}
            onChange={(event) => selectImage(event)}
          />
        </div>
        <progress 
          value={progress}
          max="100" 
          className={styles.progressBar}
          style={ {
            display: (progress > 0) && (progress < 100) ? "block": "none", 
          }}
        />
        <br />
        <button 
          className={styles.submitFormButton}
          onClick={(event) => submitForm(event)}
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default UploadItem
