import ProjectForm from "../Form/ProjectForm";
import styles from "./AddProject.module.css";

function AddProject(props){
    return <div className={styles.container}>
        <div className={styles.upper}>
            <h2>Add New Project</h2>
        </div>
        <div className={styles.bottom}>
            <ProjectForm></ProjectForm>
        </div>
    </div>
}

export default AddProject;