export default (score) => {
  if (score > 0) {
    return 'green';
  } else if (score === 0) {
    return 'red';
  } else {
    return 'blue';
  }
};
