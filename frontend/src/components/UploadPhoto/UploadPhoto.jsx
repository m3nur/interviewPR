import React, { useState } from 'react';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

const UploadPhoto = ({ avatar }) => {
  return (
    <div>
      <img src={avatar} alt="avatar" />
      <input className="input" type="file" />
    </div>
  );
};

export default UploadPhoto;
