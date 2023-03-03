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
const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
