function FormInput({ value, onChange, ...props }) {
  return (
    <div>
      <input
        value={value}
        onChange={({ target }) => onChange(target.value)}
        {...props}
      />
    </div>
  );
}

export default FormInput;
