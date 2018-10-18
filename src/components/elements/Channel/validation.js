const validation = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'You must type something.';
  }
  return errors;
};

export default validation;
