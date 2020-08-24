import { API_URL } from '../constants';
import Cookies from './cookies';

const csrf = Cookies.getCookie('XSRF-TOKEN');

function f(path, options) {
  const e = API_URL;
  return new Promise((resolve, reject) => {
    fetch(`${e}${path}`, options)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return resolve(res.json());
      })
      .catch((err) => reject(err));
  });
}

export default {
  get(path) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
    return f(path, options);
  },
  post(path, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrf,
      },
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return f(path, options);
  },
};
