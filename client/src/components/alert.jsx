import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles/alert.css";
//rafcp

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert--${alert.alertType}`}>
        {alert.message}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
