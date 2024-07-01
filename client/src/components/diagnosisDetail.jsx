/* eslint-disable*/

import "./styles/diagnosisHistory.css";
import { useSelector } from "react-redux";

import React from "react";

import { Navigate, useNavigate } from "react-router-dom";

const DiagnosisDetail = ({ reportReceived: report }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  let name = report.name.replace(/[^a-zA-Z]/g, "");

  return (
    <div className='report__details '>
      <div
        className={`report__details__download container download--${report.status}`}
      >
        <h2 className='report__details-heading'>Diagnosis Details</h2>
        <p>
          <b>Report NO :</b> {report._id}
        </p>
        <p>
          <b>Patient :</b> {report.user.name}
        </p>
        <p>
          <b>Status :</b> {report.status}
        </p>
        <p>
          <b>Patient Defined :</b> {name}
        </p>
        <p>
          <b>Suggested Action :</b> {report.action}
        </p>
        <p>
          <b>Final Diagnosis :</b> {report.description}
        </p>
        <p>
          <b>Date :</b> {report.date}
        </p>
        <hr />
        <p>
          <b>NOTE:</b> The following report is AI generated and prone to errors.
        </p>
        <p> No doctor was involved in this.</p>
        <p>This report can not be used for official purposes.</p>
        <hr />

        <p>
          <b>Diagnosed by :</b> EASEBOT
        </p>
        <hr />
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        GO Back
      </button>
    </div>
  );
};

export default DiagnosisDetail;
