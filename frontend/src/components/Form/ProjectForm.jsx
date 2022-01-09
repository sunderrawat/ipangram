import styles from "./Form.module.css";
import classes from "./ProjectForm.module.css";
function ProjectForm(props){
    return (
      <div className={styles.container}>
        <div>
          <h1>Add a new project</h1>
        </div>
        <form className={styles.form}>
          <label htmlFor="name">Project Title</label>
          <input name="name" type="text" id="name" />
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            min="2022-01-09"
            max="2025-12-31"
            name="startDate"
            id="startDate"
          />
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            min="2022-01-09"
            max="2025-12-31"
            id="endDate"
            name="endDate"
          />
          <label htmlFor="feature__image">Project Feature Image</label>
          <input type="file" accept="image/*" />
          <label htmlFor="files">Choose Multiple Doucments</label>
          <input type="file" multiple />
          <label htmlFor="description" type="text-area">
            Description
          </label>
          <textarea id="description" rows="5" cols="50"></textarea>
          <label htmlFor="members">Members</label>
          <input type="checkbox" id="sunder" />
          <label htmlFor="sunder">sunder</label>
          <div className={styles.radio__container}>
            <div className={styles.radio__group}>
              <label htmlFor="ravi">
                ravi
                <input
                  type="checkbox"
                  name="members"
                  id="ravi"
                  value="ravi"
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          </div>
          <label>Project Sataus</label>
          <div className={styles.radio__container}>
            <div className={styles.radio__group}>
              <label htmlFor="pending">
                Pending
                <input
                  type="radio"
                  name="status"
                  id="pending"
                  value="pending"
                  defaultChecked
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
            <div className={styles.radio__group}>
              <label htmlFor="completed">
                Completed
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  id="completed"
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          </div>
        </form>
      </div>
    );
}

export default ProjectForm;