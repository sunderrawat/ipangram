import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from './ProjectCard.module.css';

function ProjectCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.heading}>This is project heading</h3>
        <Link to="add-new-project">
          <Button className="model" name="Edit Project"></Button>
        </Link>
        <div className={styles.date}>
          <div className={styles.startdate}>
            <span className={styles.small__heading}>Start Date : </span>
            <span className={styles.text}>12-jan-2022</span>
          </div>
          <div className={styles.enddate}>
            <span className={styles.small__heading}>End Date :</span>{' '}
            <span className={styles.text}> 30-apr-2022</span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.img__box}>
          <img
            src="http://prcagrimex.co.th/en/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
            alt={props.name}
            className={styles.img}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.row}>
            <div>
              <span className={styles.small__heading}>Total Members : </span>
              <span className={styles.text}>5</span>
            </div>
            <div>
              <span className={styles.small__heading}> Status : </span>
              <span className={styles.text}>Pending</span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <span className={styles.small__heading}>Members : </span> Sunil,
              Nisha, Mohan
            </div>
          </div>
          <div className={styles.row}>
            <span className={styles.small__heading}>Description : </span>
            <span className={`${styles.text} ${styles.discription}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non
              dignissim lacus. Morbi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
