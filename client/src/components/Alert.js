import React from 'react';
import useAlertContext from '../context/alert/AlertContext';

const Alert = () => {
  const { alert } = useAlertContext();
  return alert ? <div className={`alert p-2 alert-${alert.type}`}>{alert.message}</div> : null
}

export default Alert
