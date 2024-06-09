/* eslint-disable*/

import "./styles/diagnosisHistory.css";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setReports } from "./../actions/report";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import axios from "axios";

const DiagnosisHistory = ({ setReports }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const user = useSelector((state) => state.auth.user);

  const reports = useSelector((state) => state.report[0]);

  useEffect(() => {
    if (user) {
      setReports({ id: user._id });
    }
  }, []);

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
              <p className='log-text'>ID: {report._id}</p>
              <p className='log-text'>Date: {report.date}</p>
            </div>
            <button className='log-details-button'>Check Details</button>
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
