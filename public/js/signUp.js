import axios from 'axios';
import { showAlert } from './alerts';
export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (response.data.status === 'success') {
      showAlert('success', 'Sign Up is successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', "Error while signing up... Try again!!!");
  }
};
