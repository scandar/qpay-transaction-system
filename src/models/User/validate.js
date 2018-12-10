import { isMobilePhone, isLength } from 'validator';

const validate = {
  name: name => isLength(name, { min: 3, max: 20 }),
  password: password => isLength(password, { min: 6, max: 25 }),
  phone: (phone) => {
    if (phone === '') return false;
    return isMobilePhone(phone, 'ar-EG'); // validate eg format
  },
  phoneLength: phone => isLength(phone, { min: 11, max: 11 }),
};

export default validate;
