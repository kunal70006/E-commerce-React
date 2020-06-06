import React, { useState } from 'react'
import styles from './UploadItem.module.css'
import { firebase , storage } from '../../Firebase'


const UploadItem = () => {

  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [progress, setProgress] = useState(0)
    
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const uploadImage = (event) => {
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
        setImageUrl(url)
      })
    })
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(event) => handleChange(event)}
      />
      <button onClick={(event) => uploadImage(event)}>Upload</button>
      <br />
      <progress 
        value={progress}
        max="100" 
        style={ {
          display: (progress > 0) && (progress < 100) ? "block": "none", 
        }}
      />
      <br />
      <img 
        src={imageUrl} 
        style={{
          height: "500px",
          width: "500px",
          display: (imageUrl === '') ? "none": "block", 
        }}
        alt=""
      />
    </div>
  )
}

export default UploadItem
