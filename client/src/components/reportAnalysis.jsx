import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./styles/reportAnalysis.css";

const ReportAnalysis = () => {
  const [analysisReport, setAnalysisReport] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [disease, setDisease] = useState(null);
  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  const handleFileChange = (event) => {
    setAnalysisReport(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!analysisReport) {
      setError("Please select a file.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/reportAnalysis/analyze",
        {
          id: user._id,

          analysisReport: analysisReport,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      const diseasebody = {
        name: response.data.diagnosis,
      };
      const diseaseData = await axios.post(
        "http://localhost:5000/api/v1/disease/get",
        diseasebody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(diseaseData.data.diseases[0]);
      if (diseaseData.data.diseases[0]) {
        setDisease(diseaseData.data.diseases[0]);
      } else {
        setDisease(null);
      }

      setDiagnosis(response.data.diagnosis);
      setText(response.data.extractedText);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error uploading file. Please try again.");
    }
  };

  return (
    <div className='ReportAnalysis'>
      <div className='report--container'>
        <h1 className='title'>Upload Medical Report</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='file'
            name='analysisReport'
            accept='image/*'
            onChange={handleFileChange}
            className='file-input'
          />
          <button type='submit' className='submit-button'>
            Upload
          </button>
        </form>
        {error && <div className='error'>{error}</div>}
        {diagnosis && (
          <div className='result'>
            <h2 className='result-title'>Diagnosis</h2>
            <p className='result-text'>{diagnosis}</p>

            {!disease ? (
              <div>
                <h2 className='result-title'>Extracted Text</h2>

                <p className='result-text'>{text}</p>
              </div>
            ) : (
              <div>
                <h1 className='result-title'> DISEASE INFORMATION</h1>
                <h2 className='result-title'>Symptoms in Database</h2>
                {disease.symptoms.map((symptom, index) => (
                  <p key={index} className='result-text'>
                    {symptom}
                  </p>
                ))}
                <h2 className='result-title'>Prevention</h2>
                <p className='result-text'>{disease.prevention}</p>
                <h2 className='result-title'>Disease Treatment</h2>
                <p className='result-text'>{disease.solution}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAnalysis;
