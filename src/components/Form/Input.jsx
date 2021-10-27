import styles from '../../styles/Form/Input.module.scss';

function FormInput({ value, onChange, ...props }) {
  return (
    <div className={styles.input__wrapper}>
      <input
        value={value}
        onChange={({ target }) => onChange(target.value)}
        className={styles.input}
        {...props}
      />
    </div>
  );
}

export default FormInput;
