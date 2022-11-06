// export const BASE_URL = "https://api.diploma.nomoredomains.work";
export const BASE_URL = 'http://localhost:3005';

export const register = ({
  email,
  password,
  name,
  surname,
  fathername,
  status
}: {
  name: string;
  surname: string;
  fathername: string;
  email: string;
  password: string;
  status: string;
}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name, status })
  }).then((res) => checkResponse(res));
};

export const login = ({
  password,
  email
}: {
  password: string;
  email: string;
}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then((res) => checkResponse(res));
};

//проверка валидности токена и получение email для вставки в шапку сайта
// export const getUserInfo = (jwt) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${jwt}`
//     }
//   }).then((res) => checkResponse(res));
// };

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
