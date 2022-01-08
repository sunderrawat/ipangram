import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import getCookie from '../utils/getCookie';
import Button from './Button';
import LoginModal from './Modal/LoginModal';
import styles from './Nav.module.css';

function Nav() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const isOpen = useSelector((state) => state.auth.isOpen);

  useEffect(() => {
    let token = getCookie('token');
    let user = localStorage.getItem('user');
    let userData = JSON.parse(user);
    if (userData && userData.name) {
      setUserData(userData);
    }
    console.log(token);
    console.log(JSON.parse(user));
    if (token) {
      dispatch(authActions.login());
    }
  }, [isLogin, isOpen]);
  const signupClickHandler = () => {
    console.log('signup clicked');
    dispatch(authActions.modalSelection('signup'));
    dispatch(authActions.loginModel());
    console.log(isOpen);
  };
  const loginClickHandler = () => {
    console.log('login clicked');
    dispatch(authActions.modalSelection('login'));
    dispatch(authActions.loginModel());
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img
          src="https://www.ipangram.com/_next/static/images/logo-a86c677ce806e4a78befd292693c87bd.png"
          alt="logo"
          className={styles.logo}
        />
      </div>
      <ul className={styles.list}>
        {isLogin ? (
          <>
            <li className={styles.name}>{userData && userData.name}</li>
            <li className={styles.name}>{userData && userData.role}</li>
            <li>
              <Button name="Logout" onClick={logoutHandler}></Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button name="SignUp" onClick={signupClickHandler}></Button>
            </li>
            <li>
              <Button name="Login" onClick={loginClickHandler}></Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;