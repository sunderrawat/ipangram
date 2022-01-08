import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { alertActions } from '../store/alert';
import styles from './Auth.module.css';
import Button from './Button';
import apiUrl from '../apiUrl';

function Auth(props) {
  const dispatch = useDispatch();
  const modelSelect = useSelector((state) => state.auth.modelSelect);

  //alert render function
  function alertRender(type, message) {
    dispatch(alertActions.alertType(type));
    dispatch(alertActions.alertMessage(message));
    dispatch(alertActions.showAlert());
  }

  //signup handler
  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      console.log('signup clicked');
      //store form data
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordConfirm: e.target.confirm.value,
        role: e.target.role.value,
      };
      //check some data validation
      if (
        data.name.length < 4 ||
        data.email.length < 5 ||
        data.password.length < 6
      ) {
        console.log('invalid data input');
        alertRender('error', 'Invalid Data');
        return;
      }
      //check password is same
      if (data.password !== data.passwordConfirm) {
        console.log('password are not matched');
        alertRender('error', 'password not matched');
        return;
      }

      //post data to server
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.ok) {
        console.log('Invalid data post');
        alertRender('error', 'Invalid data posted try again!');
      }

      const signupData = await response.json();
      console.log(signupData);
      if (signupData.token) {
        document.cookie = `token=${signupData.token};expires=Sun, 1 Jan 2025 00:00:00 UTC;path="/"`;
      }
      if (signupData.status === 'success') {
        localStorage.setItem('user', JSON.stringify(signupData.data.user));
        alertRender('success', 'Account Creation Success');
        dispatch(authActions.modalSelection('nothing'));
        dispatch(authActions.loginModelCustom(false));
      }
      //clear form input
      e.target.name.value = '';
      e.target.email.value = '';
      e.target.password.value = '';
      e.target.confirm.value = '';
      e.target.role.defaultValue = '';
    } catch (err) {
      console.log(err);
      alertRender('error', 'something went wrong try again~');
    }
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      if (data.email.length < 5 || data.password.length < 6) {
        console.log('invalid data');
        alertRender('error', 'Invaild data of email and password');
        return;
      }
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        alertRender('error', 'login failed ');
      }
      if (response.ok) {
        const user = await response.json();
        if (!user.token) {
          return alertRender('error', 'login failed ');
        }
        document.cookie = `token=${user.token}; expires=Sun, 1 Jan 2025 00:00:00 UTC;path="/"`;
        localStorage.setItem('user', JSON.stringify(user.user));
        dispatch(authActions.login());
        alertRender('success', 'User Login success');
        dispatch(authActions.loginModel());
      }
    } catch (err) {
      console.log(err);
      alertRender('error', 'login failed ');
    }
    //clear form input
    e.target.email.value = '';
    e.target.password.value = '';
  };

  const signupClickHandler = () => {
    dispatch(authActions.modalSelection('signup'));
  };

  const loginClickHandler = () => {
    dispatch(authActions.modalSelection('login'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.upper__heading}>
          Welcome to Ipangram Project Tool
        </h2>
        <div className={styles.selection}>
          <h2 className={styles.select__signup} onClick={signupClickHandler}>
            SignUp
          </h2>
          <h2 className={styles.select__login} onClick={loginClickHandler}>
            Login
          </h2>
        </div>
      </div>
      <div className={styles.bottom}>
        {modelSelect === 'signup' ? (
          <form className={styles.form} onSubmit={signupHandler}>
            <label htmlFor="name">Full Name</label>
            <input name="name" type="text" id="name" />
            <label htmlFor="email">Email</label>
            <input required name="email" type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" id="password" />
            <label htmlFor="confirm">Confirm Password</label>
            <input required name="confirm" type="password" id="confirm" />
            <div className={styles.radio__container}>
              <div className={styles.radio__group}>
                <label htmlFor="employee">
                  Employee
                  <input
                    type="radio"
                    name="role"
                    id="employee"
                    value="employee"
                    defaultChecked
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
              <div className={styles.radio__group}>
                <label htmlFor="mentor">
                  Mentor
                  <input type="radio" name="role" value="mentor" id="mentor" />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
            <Button name="Signup" cssName="model"></Button>
          </form>
        ) : modelSelect === 'login' ? (
          <form className={styles.form} onSubmit={loginHandler}>
            <label htmlFor="email">Email</label>
            <input required name="email" type="email" />
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" />
            <Button name="Login" cssName="model"></Button>
          </form>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Auth;