import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alert }) =>
  ( 
    <Fragment>
      {alert ? <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div> : null}
    </Fragment>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
