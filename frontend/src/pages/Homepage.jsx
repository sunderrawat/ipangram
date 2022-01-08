import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../store/alert';
import AlertModal from '../components/Alerts/AlertModel';
import AuthModel from '../components/AuthModel';
import styles from './Homepage.module.css';

function Homepage(props) {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.alert.showAlert);
  const alertType = useSelector((state) => state.alert.alertType);
  const alertMessage = useSelector((state) => state.alert.alertMessage);
    if (showAlert) {
      setTimeout(() => {
        dispatch(alertActions.hideAlert());
      }, 3000);
    }
    useEffect(() => {}, [showAlert]);
    
  return (
    <div>
      <div className={styles.homepage}>
        <h1 className={styles.heading}>
          Wellcome to project management software login/signup to access
        </h1>
        {showAlert ? (
          <AlertModal type={alertType} message={alertMessage}></AlertModal>
        ) : (
          ''
        )}
      </div>
      <AuthModel></AuthModel>
    </div>
  );
}

export default Homepage;
