import * as Yup from 'yup';
import config from '../config/index';

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Username is too Short!')
      .max(16, ' Username is too Long!')
      .required('Username is required')
      .test('isUniqe', 'Username is not available', (value) => checkDup('username', value)),
    password: Yup.string()
      .min(6, 'Password is too Short!')
      .max(16, 'Password is too Long!')
      .required('Password is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .test('isUniqe', 'Email is not available', (value) => checkDup('email', value)),
    agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must agree to terms')
  });   

  const memo = {
    username: {},
    email: {}
  };

  async function checkDup(type, value) {
    if(memo[type].hasOwnProperty(value)){
      return memo[type][value];
    }
    const res = await fetch(config.apiUrl + `/users/register?${type}=${value}`);
    memo[type][value] = !(await res.json());
	  return memo[type][value];
  };