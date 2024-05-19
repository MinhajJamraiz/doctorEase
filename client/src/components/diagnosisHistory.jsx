import "./styles/diagnosisHistory.css";
import React from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const DiagnosisHistory = () => {
  const user = useSelector((state) => state.auth.user);
  if (user) {
    console.log(user._id);
    const body = JSON.stringify({
      user: "65fe07727421050174f5f071",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/api/v1/report/getAll")
      .then((reports) => console.log(reports))
      .catch((err) => console.log(err));
    //     console.log(user);
  }
  //   console.log(userReports);
  return (
    <div className='log-area'>
      <div className='history-log'>
        <div className='log-content'>
          <p className='log-text'>ID: #123123</p>
          <p className='log-text'>Date: 4-8-2024</p>
        </div>
        <button className='log-details-button'>Check Details</button>
      </div>

      <div className='history-log'>
        <div className='log-content'>
          <p className='log-text'>ID: #123123</p>
          <p className='log-text'>Date: 4-8-2024</p>
        </div>
        <button className='log-details-button'>Check Details</button>
      </div>

      <div className='history-log'>
        <div className='log-content'>
          <p className='log-text'>ID: #123123</p>
          <p className='log-text'>Date: 4-8-2024</p>
        </div>
        <button className='log-details-button'>Check Details</button>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
