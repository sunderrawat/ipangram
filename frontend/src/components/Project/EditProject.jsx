import { useState, useEffect } from 'react';
import ProjectForm from '../Form/ProjectForm';
import getData from '../../utils/getData';
import postData from '../../utils/postData';
import styles from './AddProject.module.css';
import { Link, useParams } from 'react-router-dom';
import Button from '../Button';
import useRender from './../../hooks/alertRender';

function EditProject(props) {
  const { id } = useParams();
  console.log(id);
  const [members, setMembers] = useState();
  const { alertRender } = useRender();
  let user = localStorage.getItem('user');
  let userData = JSON.parse(user);
  let userRole = userData && userData.role;
  const projectSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      //   console.log(e.target.name.value);
      //   console.log(e.target.startDate.value);
      //   console.log(e.target.endDate.value);
      //   console.log(e.target.description.value);
      //   console.log(e.target.status.value);
      let membersArr = e.target.members;

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
      let data = {};

      //check data is entered or not
      if(name){
          data.name = name
      }
      if(startDate){
          data.startDate = startDate;
      }
      if(endDate){
        data.endDate = endDate;
      }
      if(description){
          data.description = description;
      }
      if(members.length>0){
          data.members = members;
      }
      data.isApproved = isApproved;
      data.isCompleted = isCompleted;
      console.log(data);

    //   if (
    //     !name ||
    //     !startDate ||
    //     !endDate ||
    //     !description ||
    //     !members.length > 0
    //   ) {
    //     console.log('Fill all the necesarry data!');
    //     alertRender('error', 'Fill all the necesarry data!');
    //     return;
    //   }

      //send data to server for adding a new project
      const editProject = await postData(`/projects/${id}`, data, 'PATCH');
      // console.log(editProject);
      if (editProject.status === 'success') {
        alertRender('success', 'Project Added Successfully');
        document.getElementById('project_form').reset();
      }
      if (editProject.status === 'fail') {
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

  return (
    <>
      {userRole === 'mentor' ? (
        <div className={styles.container}>
          <div className={styles.upper}>
            <h2 className={styles.heading}>Edit Project</h2>
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

export default EditProject;
