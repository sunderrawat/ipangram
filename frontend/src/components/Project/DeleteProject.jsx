import Button from '../Button';
import useAlertRender from '../../hooks/alertRender';
import getData from '../../utils/getData';
function DeleteProject(props) {
  const { alertRender } = useAlertRender();
  const deleteHandler = async () => {
    console.log('delete clicked')
    const response = await getData(`/projects/${props.id}`, 'DELETE');

    if (response === 'error') {
      return alertRender('error', 'Invalid operation');
    }
    alertRender('success', 'Project Deleted Success');
    // console.log(response);
  };
  return (
    <Button name="Delete" onClick={deleteHandler} className="model"></Button>
  );
}

export default DeleteProject;
