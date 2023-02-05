import { IGroupRegister } from "../interfaces";

export const BASE_URL = "http://localhost:8080";

export const register = ({
  name,
  surname,
  fathername,
  email,
  password,
  status,
  groups,
}: {
  name: string;
  surname: string;
  fathername: string;
  email: string;
  password: string;
  status: string;
  groups: Array<IGroupRegister> | null;
}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      surname,
      fathername,
      groups,
      status,
    }),
  }).then((res) => checkResponse(res));
};

export const login = ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

// проверка валидности токена и получение email для вставки в шапку сайта
export const getUserInfo = (jwt: string | null) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
