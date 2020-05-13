const errorToString = error => {
  const newString = error.message.replace('/', '').replace(/"/g, '');
  return newString;
};
export default errorToString;
