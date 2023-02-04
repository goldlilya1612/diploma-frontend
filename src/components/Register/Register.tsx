import {useCallback, useState} from "react";
import {v4 as uuidv4} from "uuid";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import GroupRegister from "../GroupRegister/GroupRegister";
import Logo from "../Logo/Logo";
import {REGISTER} from "../../utils/constants";
import "./Register.css";
import {IDataRegister, IErrorsRegister,} from "../../interfaces";
import {EUserStatus} from "../../enums/user-statuses.enum";
import {isEmpty} from "lodash";

function Register({
    onRegister,
    isDisabled,
}: {
    onRegister: any;
    isDisabled: any;
}) {
    const [errors, setErrors] = useState({} as IErrorsRegister);
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
    const checkGroupsValidation = () => {
        if (data.status === EUserStatus.LECTOR) {
            return !data.groups?.find(group => group.name === '')
        } else return true
    };

    const isFormCompleted = () => !!(data.name && data.surname && data.fathername && data.email && data.password && data.status)
    const isErrorsInForm = () =>  !!Object.entries(errors).find(([_key, value]) => value !== '');
    const checkInputsValidation = () => {
        if (isEmpty(errors)) return false //инициализация формы

        return isFormCompleted() && !isErrorsInForm();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const { name, value } = target;
        if (name === "status") {
            handleGroupsChange(name, value as EUserStatus);
        } else {
            setData({ ...data, [name]: value });
            setErrors({ ...errors, [name]: target.validationMessage });
        }
    };
    const handleGroupsChange = (name: string, value: EUserStatus) => {
        setValue(value as EUserStatus);
        if (value === EUserStatus.STUDENT) {
            setData({ ...data, [name]: value, groups: null});
        } else if (value === EUserStatus.LECTOR) {
            setData({ ...data, [name]: value, groups: [{ name: "", key: uuidv4() }]});
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        resetForm();
        onRegister(
            setData,
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
        ) => {
            setData(newData);
            setErrors(newErrors as IErrorsRegister);
        },
        [setData, setErrors]
    );

    return (
        <section className="section-with-form">
            <div className="section-with-form__top">
                <Logo />
                <h1 className="section-with-form__title">Добро пожаловать!</h1>
            </div>
            <form autoComplete={'off'} onSubmit={handleSubmit} className="section-with-form__form">
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
                                    checked={value === "student"}
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
                                    checked={value === "lector"}
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
                        {data.groups?.map((dataGroup) => (
                            <GroupRegister
                                key={dataGroup.key}
                                group={dataGroup}
                                data={data}
                                setData={setData}
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
                            autoComplete={'off'}
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
                            autoComplete={'off'}
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
                    isValid={checkInputsValidation() && checkGroupsValidation()}
                    isDisabled={isDisabled}
                />
            </form>
        </section>
    );
}

export default Register;
