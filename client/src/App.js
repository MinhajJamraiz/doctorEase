import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingForm from "./components/landingForm";
import DiagnosisDetail from "./components/diagnosisDetail";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Chatbox from "./components/chatbox";
import NotFound from "./components/notFound";
import Header from "./components/header";
import DiagnosisHistory from "./components/diagnosisHistory";
import XrayAnalysis from "./components/xrayAnalysis";
import ReportAnalysis from "./components/reportAnalysis";
import UserProfile from "./components/userProfile";
import Alert from "./components/alert";
import { loadUser } from "./actions/auth";

//REDUX
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [reportToSend, setReportToSend] = useState({});
  const sendReportToDiagnosisDetail = (data) => {
    setReportToSend(data);
  };

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Alert />

        <Routes>
          <Route exact path='/' element={<LandingForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/chatbox' element={<Chatbox />} />
          <Route
            path='/history'
            element={
              <DiagnosisHistory
                sendReportToDiagnosisDetail={sendReportToDiagnosisDetail}
              />
            }
          />
          <Route path='/xrayAnalysis' element={<XrayAnalysis />} />
          <Route path='/reportAnalysis' element={<ReportAnalysis />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route
            path='/diagnosisDetail'
            element={<DiagnosisDetail reportReceived={reportToSend} />}
          />
          {/* <Route path='/diagnosisDetail' element={(props =>{})} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
