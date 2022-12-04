import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import GroupRegister from "../GroupRegister/GroupRegister";
import Logo from "../Logo/Logo";
import { REGISTER } from "../../utils/constants";
import { useState } from "react";
import "./Register.css";
import {
    IErrorsRegister,
    IDataRegister,
    IGroupRegister,
} from "../../interfaces";
import { EUserStatus } from "../../enums/user-statuses.enum";

function Register({
    onRegister,
    isDisabled,
}: {
    onRegister: any;
    isDisabled: any;
}) {
    const [errors, setErrors] = useState({} as IErrorsRegister);
    const [isValid, setIsValid] = useState(false);
    const [dataGroups, setDataGroups] = useState<Array<IGroupRegister> | null>([
        { name: "", key: uuidv4() },
    ]);
    const [value, setValue] = useState(EUserStatus.STUDENT);
    const [data, setData] = useState({
        name: "",
        surname: "",
        fathername: "",
        email: "",
        password: "",
        status: EUserStatus.STUDENT,
        groups: null,
    } as IDataRegister);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const { name, value } = target;
        setData({ ...data, [name]: value });
        if (name === "status") {
            setValue(value as EUserStatus);
            if (value === EUserStatus.STUDENT) {
                setDataGroups(null);
            } else if (value === EUserStatus.LECTOR) {
                setDataGroups([{ name: "", key: uuidv4() }]);
            }
        } else {
            setErrors({ ...errors, [name]: target.validationMessage });
        }

        setIsValid((target.closest("form") as HTMLFormElement).checkValidity());
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setData({ ...data, groups: dataGroups });
        resetForm();
        onRegister(
            { ...data, groups: dataGroups },
            setData,
            setIsValid,
            setErrors,
            resetForm
        );
    };

    const resetForm = useCallback(
        (
            newData = {
                name: "",
                surname: "",
                fathername: "",
                email: "",
                password: "",
                status: EUserStatus.STUDENT,
                groups: null,
            },
            newErrors = {},
            newIsValid = false
        ) => {
            setData(newData);
            setErrors(newErrors as IErrorsRegister);
            setIsValid(newIsValid);
        },
        [setData, setErrors, setIsValid]
    );

    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Добро пожаловать!</h1>
            </div>
            <form onSubmit={handleSubmit} className="section-with-form__form">
                <label
                    className="section-with-form__label"
                    htmlFor="name-register"
                >
                    Имя
                    {isDisabled ? (
                        <input
                            disabled
                            required
                            onChange={handleChange}
                            value={data.name}
                            type="text"
                            name="name"
                            id="name-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    ) : (
                        <input
                            required
                            onChange={handleChange}
                            value={data.name}
                            type="text"
                            name="name"
                            id="name-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    )}
                    <span className="section-with-form__error">
                        {errors.name}
                    </span>
                </label>
                <label
                    className="section-with-form__label"
                    htmlFor="surname-register"
                >
                    Фамилия
                    {isDisabled ? (
                        <input
                            disabled
                            required
                            onChange={handleChange}
                            value={data.surname}
                            type="text"
                            name="surname"
                            id="surname-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    ) : (
                        <input
                            required
                            onChange={handleChange}
                            value={data.surname}
                            type="text"
                            name="surname"
                            id="surname-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    )}
                    <span className="section-with-form__error">
                        {errors.surname}
                    </span>
                </label>
                <label
                    className="section-with-form__label"
                    htmlFor="fathername-register"
                >
                    Отчество
                    {isDisabled ? (
                        <input
                            disabled
                            required
                            onChange={handleChange}
                            value={data.fathername}
                            type="text"
                            name="fathername"
                            id="fathername-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    ) : (
                        <input
                            required
                            onChange={handleChange}
                            value={data.fathername}
                            type="text"
                            name="fathername"
                            id="fathername-register"
                            className="section-with-form__input"
                            minLength={2}
                            maxLength={30}
                        ></input>
                    )}
                    <span className="section-with-form__error">
                        {errors.fathername}
                    </span>
                </label>
                <label
                    className="section-with-form__label"
                    htmlFor="role-register"
                >
                    Статус
                    <div className="radio__wrapper">
                        <div className="radio">
                            <label className="radio__label">
                                <input
                                    type="radio"
                                    name="status"
                                    id="status-student-register"
                                    value={EUserStatus.STUDENT}
                                    checked={value === "student" ? true : false}
                                    onChange={handleChange}
                                />
                                Студент
                            </label>
                        </div>
                        <div className="radio">
                            <label className="radio__label">
                                <input
                                    type="radio"
                                    name="status"
                                    id="status-lector-register"
                                    value={EUserStatus.LECTOR}
                                    checked={value === "lector" ? true : false}
                                    onChange={handleChange}
                                />
                                Преподаватель
                            </label>
                        </div>
                    </div>
                </label>

                {data.status === EUserStatus.LECTOR ? (
                    <section className="groups-block">
                        <p className="groups-block__title">Группы:</p>
                        {dataGroups?.map((dataGroup) => (
                            <GroupRegister
                                key={dataGroup.key}
                                group={dataGroup}
                                dataGroups={dataGroups}
                                setDataGroups={setDataGroups}
                            />
                        ))}
                    </section>
                ) : (
                    ""
                )}

                <label
                    className="section-with-form__label"
                    htmlFor="email-register"
                >
                    E-mail
                    {isDisabled ? (
                        <input
                            disabled
                            required
                            onChange={handleChange}
                            value={data.email}
                            type="email"
                            name="email"
                            id="email-register"
                            className="section-with-form__input"
                        ></input>
                    ) : (
                        <input
                            required
                            onChange={handleChange}
                            value={data.email}
                            type="email"
                            name="email"
                            id="email-register"
                            className="section-with-form__input"
                        ></input>
                    )}
                    <span className="section-with-form__error">
                        {errors.email}
                    </span>
                </label>
                <label
                    className="section-with-form__label"
                    htmlFor="password-register"
                >
                    Пароль
                    {isDisabled ? (
                        <input
                            required
                            onChange={handleChange}
                            value={data.password}
                            type="password"
                            name="password"
                            id="password-register"
                            className="section-with-form__input"
                            minLength={8}
                        ></input>
                    ) : (
                        <input
                            required
                            onChange={handleChange}
                            value={data.password}
                            type="password"
                            name="password"
                            id="password-register"
                            className="section-with-form__input"
                            minLength={8}
                        ></input>
                    )}
                    <span className="section-with-form__error">
                        {errors.password}
                    </span>
                </label>
                <ButtonBlock
                    content={REGISTER}
                    name="register"
                    isValid={isValid}
                    isDisabled={isDisabled}
                />
            </form>
        </section>
    );
}

export default Register;
