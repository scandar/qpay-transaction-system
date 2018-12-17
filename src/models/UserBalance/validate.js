import { isFloat } from 'validator';

const validate = {
  amount: amount => isFloat(`${amount}`),
};

export default validate;
