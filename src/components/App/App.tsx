import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import * as auth from "../../utils/auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Courses from "../Courses/Courses";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Popup from "../Popup/Popup";
import { IDataRegister, IErrorsRegister } from "../../interfaces";

const App = () => {
    const history = useHistory();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

    const handleRegister = (
        data: IDataRegister,
        setData: (value: IDataRegister) => void,
        setIsValid: (value: boolean) => void,
        setErrors: (value: IErrorsRegister) => void,
        resetForm: any
    ) => {
        const { name, surname, fathername, email, password, status, groups } =
            data;

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
                handleLogin(
                    { email, password },
                    setData,
                    setIsValid,
                    setErrors,
                    resetForm
                );
            })
            .catch((err) => {
                if (err === "Ошибка: 409") {
                    setMessage(
                        "Пользователь с таким email уже зарегистрирован"
                    );
                    setIsPopupOpen(true);
                } else if (err === "Ошибка: 400") {
                    setMessage("Ошибка валидации");
                    setIsPopupOpen(true);
                }
            });
    };

    // data, setData, setIsValid, setErrors, resetForm
    const handleLogin = (
        { email, password }: { email: string; password: string },
        setData: (value: IDataRegister) => void,
        setIsValid: (value: boolean) => void,
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

                    auth.getUserInfo(localStorage.getItem("token"))
                        .then((res) => {
                            setCurrentUser({
                                name: res.name,
                                email: res.email,
                            });
                            localStorage.setItem("loggedIn", "true");
                            history.push("/acc");
                        })
                        .catch((err) => {
                            console.log(`Ошибка: ${err}`);
                        });
                } else {
                    localStorage.removeItem("token");
                    history.push("/signin");
                }
            })
            .finally(() => {
                resetForm();
                setIsDisabled(false);
                setIsPreloaderVisible(false);
            })
            .catch((err) => {
                if (err === "Ошибка: 400") {
                    setMessage("Вы ввели неправильный логин или пароль.");
                    setIsPopupOpen(true);
                }
            });
    };

    return (
        <div className="page">
            <Route exact path="/">
                <Header />
                <Main />
            </Route>
            <Route path="/signup">
                <Register isDisabled={isDisabled} onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
                <Login isDisabled={isDisabled} onLogin={handleLogin} />
            </Route>
            <Route path="/courses">
                <Header />
                <Courses />
            </Route>
            <Route path="/profile">{<h1>acc</h1>}</Route>
            <Footer />
            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                message={message}
            />
        </div>
    );
};

export default App;
