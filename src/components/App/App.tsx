import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import * as auth from "../../utils/auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Popup from "../Popup/Popup";
import { IDataRegister, IErrorsRegister } from "../../interfaces";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Courses from "../Courses/Courses";
import { EPopupType } from "../../enums/popup-type.enum";

const App = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessagePopup, setErrorMessagePopup] = useState({
    code: 0,
    name: "",
  });
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  const handleRegister = (
    data: IDataRegister,
    setData: (value: IDataRegister) => void,
    setErrors: (value: IErrorsRegister) => void,
    resetForm: any
  ) => {
    const { name, surname, fathername, email, password, status, groups } = data;

    return auth
      .register({
        name,
        surname,
        fathername,
        email,
        password,
        status,
        groups,
      })
      .then(() => {
        handleLogin({ email, password }, setData, setErrors, resetForm);
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setErrorMessagePopup({
            name: "Пользователь с таким email уже зарегистрирован",
            code: 409,
          });
          setIsPopupOpen(true);
        } else if (err === "Ошибка: 400") {
          setErrorMessagePopup({ name: "Ошибка валидации", code: 400 });
          setIsPopupOpen(true);
        }
      });
  };
  const handleLogin = (
    { email, password }: { email: string; password: string },
    setData: (value: IDataRegister) => void,
    setErrors: (value: IErrorsRegister) => void,
    resetForm: any
  ) => {
    return auth
      .login({ email, password })
      .then((data) => {
        setIsDisabled(true);
        setIsPreloaderVisible(true);
        if (!data)
          throw new Error(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );

        if (data.token) {
          localStorage.setItem("token", data.token);

          auth
            .getUserInfo(localStorage.getItem("token"))
            .then((res) => {
              setCurrentUser({
                name: res.name,
                email: res.email,
              });
              localStorage.setItem("loggedIn", "true");
              navigate("/profile");
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      })
      .finally(() => {
        resetForm();
        setIsDisabled(false);
        setIsPreloaderVisible(false);
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          setErrorMessagePopup({
            name: "Вы ввели неправильный логин или пароль.",
            code: 400,
          });
          setIsPopupOpen(true);
        }
        if (err === "Ошибка: 401") {
          setErrorMessagePopup({
            name: "Вы ввели неправильный логин или пароль.",
            code: 401,
          });
          setIsPopupOpen(true);
        }
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <>
              <Register isDisabled={isDisabled} onRegister={handleRegister} />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <>
              <Login isDisabled={isDisabled} onLogin={handleLogin} />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Header />
              <Courses />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Header />
              <button onClick={handleLogout}>Выйти</button>
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={errorMessagePopup}
        popupType={"error" as EPopupType}
      />
    </div>
  );
};

export default App;
