export default isVerify => {
  switch (isVerify) {
    case '未核实':
      return 'blue';
    case '核实通过':
      return 'green';
    case '核实不通过':
      return 'red';
    default:
      return 'gray';
  }
};