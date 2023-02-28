import { IGroupRegister } from "../interfaces";

export const BASE_URL = "http://localhost:8080";

export const register = ({
  name,
  email,
  password,
  passwordConfirm,
  role,
  groups,
}: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  groups: Array<string> | null;
}) => {
  return fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      passwordConfirm,
      name,
      groups,
      role,
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
  return fetch(`${BASE_URL}/api/auth/signin`, {
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
  return fetch(`${BASE_URL}/api/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const createCourse = (formData: any, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/courses/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(formData) /*formData*/,
  }).then((res) => checkResponse(res));
};

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
