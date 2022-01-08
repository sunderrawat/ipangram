import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../store/alert';
import { authActions } from '../store/auth';
import AlertModal from '../components/Alerts/AlertModel';
import LoginModal from '../components/Modal/LoginModal';
import styles from './Homepage.module.css';

function Homepage(props) {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.alert.showAlert);
  const alertType = useSelector((state) => state.alert.alertType);
  const alertMessage = useSelector((state) => state.alert.alertMessage);
  const isOpen = useSelector((state) => state.auth.isOpen);
  if (showAlert) {
    setTimeout(() => {
      dispatch(alertActions.hideAlert());
    }, 3000);
  }
  useEffect(() => {}, [showAlert]);

  function clickLoginHandler() {
    console.log('backdrop clicked')
    dispatch(authActions.loginModel());
  }

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
        {isOpen ? <LoginModal onClick={clickLoginHandler}></LoginModal> : ''}
      </div>
    </div>
  );
}

export default Homepage;
