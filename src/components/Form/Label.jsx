function FormLabel({ children, ...props }) {
  return (
    <label {...props} style={{ font: 'inherit', fontSize: '1.125rem' }}>
      {children}
    </label>
  );
}

export default FormLabel;
