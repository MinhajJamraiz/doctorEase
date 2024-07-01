import React, { useState } from "react";
import axios from "axios";
import "./styles/reportAnalysis.css";

const XrayAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [boneType, setBoneType] = useState("");
  const [fracturePrediction, setFracturePrediction] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first!!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBoneType(response.data.bone_type);
      setFracturePrediction(response.data.fracture_prediction);
      setError("");
    } catch (error) {
      console.error("Error uploading the file:", error);
      // setError("Error predicting the image. Please try again.");
      setError(error.response.data);

      setBoneType("");
      setFracturePrediction("");
    }
  };

  return (
    <div className='ReportAnalysis'>
      <div className='report--container'>
        <h1 className='title'>Xray Analysis</h1>
        <p className='xray-warning'>Currently Limited to body parts in Arm</p>
        <p className='xray-warning'>
          Shoulder Humerus Elbow Forearm Wrist Hand Finger
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit} className='form'>
            <input
              type='file'
              accept='image/*'
              className='file-input'
              onChange={handleFileChange}
            />
            <br />
            <button className='submit-button' type='submit'>
              Predict
            </button>
          </form>
          {selectedFile && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <img
                src={imagePreview}
                alt='Uploaded'
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}
          {error && <p className='error'>{error}</p>}
          {boneType && fracturePrediction && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h2 className='result-title'>Bone Type</h2>
              <p className='result-text'>{boneType}</p>
              <h2 className='result-title'>Fracture Prediction:</h2>
              <p className='result-text'>{fracturePrediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XrayAnalysis;
