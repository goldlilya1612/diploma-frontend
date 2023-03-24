export const BASE_URL = "http://localhost:8080";

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

export const createCourse = (formData: FormData, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/courses/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  }).then((res) => checkResponse(res));
};

export const getCourses = (jwt: string | null) => {
  return fetch(`${BASE_URL}/api/courses/get-courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const deleteCourse = (id: number, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/courses/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
