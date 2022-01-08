import AuthModel from '../components/AuthModel';
import styles from './Homepage.module.css';

function Homepage(props) {
  return (
    <div>
      <div className={styles.homepage}>
        <h1 className={styles.heading}>
          Wellcome to project management software login/signup to access
        </h1>
      </div>
      <AuthModel></AuthModel>
    </div>
  );
}

export default Homepage;
