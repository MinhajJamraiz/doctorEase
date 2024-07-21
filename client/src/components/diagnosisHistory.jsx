/* eslint-disable*/

import "./styles/diagnosisHistory.css";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setReports } from "./../actions/report";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

const DiagnosisHistory = ({ setReports, sendReportToDiagnosisDetail }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const user = useSelector((state) => state.auth.user);

  const reports = useSelector((state) => state.report[0]);

  useEffect(() => {
    if (user) {
      setReports({ id: user._id });
    }
  }, []);
  const handleClick = (report) => {
    const newReport = JSON.stringify(report);
    sendReportToDiagnosisDetail(report);
    navigate("/diagnosisDetail");
  };

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='log-area'>
      <div className='history-heading'>DIAGNOSIS HISTORY</div>
      {!reports ? (
        <div className='error'>NO REPORTS FOUND</div>
      ) : (
        reports.map((report, index) => (
          <div
            key={index}
            className={`history-log history-log--${report.status}`}
          >
            <div className='log-content'>
              <p className='log-text'>
                <b>Initial Problem : </b>
                {report.name.replace(/[^a-zA-Z]/g, "")} <br />
                <br />
                <b>Patient :</b> {report.user.name}
              </p>
              <p>
                <b>Report Id :</b> {report._id}
              </p>
            </div>
            <button
              className='log-details-button'
              onClick={() => {
                handleClick(report);
              }}
            >
              Check Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

DiagnosisHistory.proptypes = {
  setReports: PropTypes.func.isRequired,
};

export default connect(null, { setReports })(DiagnosisHistory);
