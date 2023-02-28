import { Option } from "react-dropdown";

const REGISTER = {
  button: "Зарегистрироваться",
  text: "Уже зарегистрированы?",
  link: "Войти",
  path: "/signin",
};
const LOGIN = {
  button: "Войти",
  text: "Еще не зарегистрированы?",
  link: "Регистрация",
  path: "/signup",
};
const EMPTY_STATE = {
  courses: "Упс... Курсов нет.",
  course: "Ой... Пока что курс пустой.",
  chapter: "Статья еще не написана.",
};
const OPTIONS = [
  {
    value: "Frontend разработка",
    label: "Frontend разработка",
    className: "popup__dropdown-option",
  },
  {
    value: "Backend разработка",
    label: "Backend разработка",
    className: "popup__dropdown-option",
  },
  {
    value: "Мобильная разработка",
    label: "Мобильная разработка",
    className: "popup__dropdown-option",
  },
  { value: "Дизайн", label: "Дизайн", className: "popup__dropdown-option" },
  { value: "Другое", label: "Другое", className: "popup__dropdown-option" },
] as Option[];

export { LOGIN, REGISTER, EMPTY_STATE, OPTIONS };
