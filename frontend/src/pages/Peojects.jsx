import { useState, useEffect } from 'react';
import apiUrl from '../apiUrl';
import getCookie from '../utils/getCookie';
import ProjectCard from '../components/Project/ProjectCard';
import Button from "./../components/Button";
import styles from "./Project.module.css";

function Projects() {
  const [data, setData] = useState();
  useEffect(() => {
    const token = getCookie('token');
    fetch(`${apiUrl}/Projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {console.log(data && data.data && data.data.results)}
        <h2 className={styles.heading}>
          Total Projects Assigned by you{' '}
          {data && data.data && data.data.results}
        </h2>
        <Button name="Add New Project" className="model"></Button>
      </div>
      <div className={styles.bottom}>
        <ProjectCard></ProjectCard>
      </div>
    </div>
  );
}

export default Projects;
