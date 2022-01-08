import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import getCookie from '../utils/getCookie';
import Button from './Button';
import styles from './Nav.module.css';
function Nav() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [logout, setLogout] = useState(0);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

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
  }, [isLogin]);
  const signupHandler = () => {
    console.log('signup clicked');
  };
  const loginHandler = () => {
    console.log('login clicked');
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
              <Button name="SignUp" onClick={signupHandler}></Button>
            </li>
            <li>
              <Button name="Login" onClick={loginHandler}></Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
