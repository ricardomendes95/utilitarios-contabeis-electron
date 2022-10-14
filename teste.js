const moment = require('moment');
const obj = [
  {
    idEmp: 1,
    name: 'funalo1',
  },
  {
    idEmp: 1,
    name: 'funalo1',
  },
  {
    idEmp: 2,
    name: 'funalo2',
  },
  {
    idEmp: 2,
    name: 'funalo2',
  },
  {
    idEmp: 14,
    name: 'funalo1',
  },
  {
    idEmp: 15,
    name: 'funalo1',
  },
];

const obj2 = [1,2,3,4];

console.log(
  obj.reduce((total, next) => total + next.idEmp, 0).toLocaleString('pt-br', {minimumFractionDigits: 2})
);

console.log(obj.includes(15));
