import Button from './Button';
import styles from './Nav.module.css';
function Nav() {
  const signupHandler = () => {
    console.log('signup clicked');
  };
  const loginHandler = () => {
    console.log('login clicked');
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
        <li>
          <Button name="SignUp" onClick={signupHandler}></Button>
        </li>
        <li>
          <Button name="Login" onClick={loginHandler}></Button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
