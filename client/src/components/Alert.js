import React from 'react';
import useAlertContext from '../context/alert/AlertContext';

const Alert = () => {
  const { showAlert, type, message } = useAlertContext();
  return (
    <div className={`alert p-2 alert-${type}`}>{message}</div>
  )
}

export default Alert
