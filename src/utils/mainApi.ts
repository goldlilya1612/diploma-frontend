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
  return fetch(`${BASE_URL}/api/course/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  }).then((res) => checkResponse(res));
};

export const updateCourse = (formData: FormData, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  }).then((res) => checkResponse(res));
};
export const getCourses = (jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/get-courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const deleteCourse = (id: number, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const getCourse = (id: number | undefined, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/get-course?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const createChapter = (
  data: { courseID: number; name: string },
  jwt: string | null
) => {
  return fetch(`${BASE_URL}/api/course/chapter/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const deleteChapter = (id: number, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/chapter/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const updateChapter = (
  data: { id: number; name: string },
  jwt: string | null
) => {
  return fetch(`${BASE_URL}/api/course/chapter/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const createArticle = (
  data: { chapterID: number; name: string },
  jwt: string | null
) => {
  return fetch(`${BASE_URL}/api/course/chapter/article/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const updateArticle = (
  data: { id: number; name: string },
  jwt: string | null
) => {
  return fetch(`${BASE_URL}/api/course/chapter/article/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const deleteArticle = (id: number, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/chapter/article/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

export const getArticleContent = (id: number, jwt: string | null) => {
  return fetch(`${BASE_URL}/api/course/chapter/article/get-content?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};
export const updateArticleContent = (
  data: { id: number; content: string },
  jwt: string | null
) => {
  return fetch(`${BASE_URL}/api/course/chapter/article/update-content`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

const checkResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
