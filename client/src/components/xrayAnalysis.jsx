import React, { useState } from "react";
import axios from "axios";
import "./styles/xrayAnalysis.css"; // Import the CSS file

const XrayAnalysis = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("xray", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/xray/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className='upload-container'>
      <h1 className='upload-title'>Upload X-ray Image</h1>
      <form className='upload-form' onSubmit={handleSubmit}>
        <input
          className='upload-input'
          type='file'
          onChange={handleFileChange}
        />
        <button className='upload-button' type='submit'>
          Upload
        </button>
      </form>
      {predictions && (
        <div className='predictions-container'>
          <h2 className='predictions-title'>Predictions:</h2>
          <pre className='predictions-content'>
            {JSON.stringify(predictions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default XrayAnalysis;
