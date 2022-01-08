import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      className={`${styles.btn} ${
        props.cssName === 'model' ? styles.model : ''
      }`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default Button;
