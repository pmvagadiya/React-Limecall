import React from 'react'
import CommonButtons from './CommonButtons'

const UploadPhoto = ({ uploadTitle }) => {
  return (
    <div className="holder-upload-logo">
      <div className="holder-logo">
        <label className="default-text upload-title">{uploadTitle}</label>
        <div className="logo"></div>
      </div>
      <div className="holder-upload">
        <p className="bold-text upload-title">Upload Your Logo</p>
        <p className="upload-desc">
          Your logo should be less than 500px x 300px
        </p>
        <p className="upload-desc">
          logos should be either a .jpg, .png, or .gif to work properly
        </p>
        <div className="holder-buttons">
          <CommonButtons content="Upload Logo" background="transparent" />
          <CommonButtons content="Clear Logo" />
        </div>
      </div>
    </div>
  )
}

export default UploadPhoto
