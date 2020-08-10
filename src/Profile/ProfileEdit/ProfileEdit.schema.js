import * as Yup from 'yup';
import config from '../../config/index';
import { useContext } from 'react';
import { UserContext } from '../../user-context';



export const ProfileEditSchema = Yup.object().shape({
    image: Yup.mixed(),
    bio: Yup.string()
        .max(2000, 'Description is too long'),
    email: Yup.string()
    .email('Invalid email')
    .test('isUniqe', 'Email is not available', (value) => checkDup('email', value)),
    username: Yup.string()
      .min(2, 'Username is too Short!')
      .max(16, ' Username is too Long!')
      .test('isUniqe', 'Username is not available', (value) => checkDup('username', value))
        
});

const memo = {
    username: {},
    email: {}
  };

  async function checkDup(type, value) {

    if(memo[type].hasOwnProperty(value)){
      return memo[type][value];
    }
    // if(user[type] === value) return true;

    const res = await fetch(config.apiUrl + `/users/check?${type}=${value}`,{credentials: 'include'});
    console.log(res);
    memo[type][value] = !(await res.json());
	  return memo[type][value];
  };