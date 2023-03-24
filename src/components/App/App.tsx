import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import * as auth from "../../utils/auth";
import { getUserInfo } from "../../utils/mainApi";
import CourseContent from "../CourseContent/CourseContent";
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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { userSlice } from "../../store/reducers/UserSlice";
import { appSlice } from "../../store/reducers/AppSlice";
import BounceLoader from "react-spinners/BounceLoader";

const App = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessagePopup, setErrorMessagePopup] = useState({
    code: 0,
    name: "",
  });
  const dispatch = useAppDispatch();
  const { getUser } = userSlice.actions;
  const { setIsLoading } = appSlice.actions;
  const { isLoading } = useAppSelector((state) => state.appReducer.app);

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleRegister = (
    data: IDataRegister,
    setData: (value: IDataRegister) => void,
    setErrors: (value: IErrorsRegister) => void,
    resetForm: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const {
      name,
      surname,
      fathername,
      email,
      password,
      role,
      groups,
      passwordConfirm,
    } = data;
    const userName = surname + " " + name + " " + fathername;
    const groupsNames = groups?.map((item) => item.name);

    return auth
      .register({
        name: userName,
        email,
        password,
        passwordConfirm,
        role,
        groups: groupsNames || null,
      })
      .then(() => {
        dispatch(setIsLoading(true));
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

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      dispatch(setIsLoading(true));
      getUserInfo(localStorage.getItem("token"))
        .then((res: any) => {
          const user = res.data.user;
          dispatch(getUser(user));
          localStorage.setItem("loggedIn", "true");
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
          handleLogout();
        })
        .finally(() => dispatch(setIsLoading(false)));
    }
  }

  const handleLogin = (
    { email, password }: { email: string; password: string },
    setData: (value: IDataRegister) => void,
    setErrors: (value: IErrorsRegister) => void,
    resetForm: any
  ) => {
    dispatch(setIsLoading(true));
    return auth
      .login({ email, password })
      .then((data) => {
        setIsDisabled(true);

        if (!data)
          throw new Error(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );

        if (data.data.token) {
          localStorage.setItem("token", data.data.token);
          dispatch(setIsLoading(true));
          getUserInfo(localStorage.getItem("token"))
            .then((res: any) => {
              const user = res.data.user;
              dispatch(getUser(user));
              localStorage.setItem("loggedIn", "true");
              navigate("/");
            })
            .catch((err: any) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          localStorage.removeItem("token");
          navigate("/signin");
        }
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
      })
      .finally(() => {
        resetForm();
        setIsDisabled(false);
        dispatch(setIsLoading(false));
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="page">
      <Routes>
        {" "}
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
        <Route
          path="/courses/:courseName"
          element={
            <ProtectedRoute>
              <Header />
              <CourseContent />
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
      />
      {isLoading ? (
        <div className="loader-wrapper">
          <BounceLoader
            color={"#4a61dd"}
            loading={isLoading}
            cssOverride={{ position: "absolute", bottom: "50%", left: "50%" }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
