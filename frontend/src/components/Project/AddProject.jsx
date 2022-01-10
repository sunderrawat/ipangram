import { useState, useEffect } from 'react';
import ProjectForm from '../Form/ProjectForm';
import getData from '../../utils/getData';
import postFormData from '../../utils/postFormData';
import styles from './AddProject.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button';
import useRender from './../../hooks/alertRender';

function AddProject(props) {
  const [members, setMembers] = useState();
  const { alertRender } = useRender();
  const projectSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      //   console.log(e.target.name.value);
      //   console.log(e.target.startDate.value);
      //   console.log(e.target.endDate.value);
      //   console.log(e.target.description.value);
      //   console.log(e.target.status.value);
      let membersArr = e.target.members;
      // console.log(e.target.files.files);
      const feature_image =
        e.target.feature_image.files && e.target.feature_image.files[0];
      if (e.target.files.files && e.target.files.files.length > 0) {
        for (let i = 0; i < e.target.files.files.length; i++) {
          // console.log(e.target.files.files[i]);
          formData.append(
            e.target.files.files[i].name,
            e.target.files.files[i]
          );
        }
      }
      
      let membersId = [];
      //get checked member data and store to array
      for (let i = 0; i < membersArr.length; i++) {
        if (membersArr[i].checked) {
          membersId.push(membersArr[i].value);
        }
      }
      const name = e.target.name.value;
      const startDate = e.target.startDate.value;
      const endDate = e.target.endDate.value;
      const description = e.target.description.value;
      const isCompleted = e.target.status.value === 'pending' ? false : true;
      const isApproved = e.target.approval.value === 'pending' ? false : true;
      const members = membersId;
      const data = {
        name,
        startDate,
        endDate,
        description,
        isCompleted,
        isApproved,
        members,
        feature_image,
      };
      console.log(data);

      if (
        !name ||
        !startDate ||
        !endDate ||
        !description ||
        !members.length > 0
      ) {
        console.log('Fill all the necesarry data!');
        alertRender('error', 'Fill all the necesarry data!');
        return;
      }
      // const formData = new FormData();
      for (const property in data) {
        formData.append(property, data[property]);
      }
      // console.log(formData);
      //send data to server for adding a new project
      const addNewProject = await postFormData('/projects/upload', formData);
      // console.log(addNewProject);
      if (addNewProject.status === 'success') {
        alertRender('success', 'Project Added Successfully');
        document.getElementById('project_form').reset();
      }
      if (addNewProject.status === 'fail') {
        alertRender('error', 'Project Added Failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function fechAllMembers() {
    const data = await getData('/users');
    console.log('in add project page ', data);
    if (data !== 'error') {
      if (data.status !== 'fail') {
        setMembers(data.users);
        return;
      }
      return;
    }
    alertRender('error', 'Members not Loaded');
  }

  useEffect(() => {
    fechAllMembers();
  }, []);

  let user = localStorage.getItem('user');
  let userData = JSON.parse(user);
  let userRole = userData && userData.role;

  return (
    <>
      {userRole === 'mentor' ? (
        <div className={styles.container}>
          <div className={styles.upper}>
            <h2 className={styles.heading}>Add New Project</h2>
            <Link to="/projects">
              <Button name="Back" className="model"></Button>
            </Link>
          </div>
          <div className={styles.bottom}>
            <ProjectForm
              onSubmit={projectSubmitHandler}
              members={members}
            ></ProjectForm>
          </div>
        </div>
      ) : (
        <div>Login into app to access this route</div>
      )}
    </>
  );
}

export default AddProject;
