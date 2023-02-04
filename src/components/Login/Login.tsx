import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { LOGIN } from "../../utils/constants";
import React, { useCallback, useState } from "react";
import "./Login.css";
import { isEmpty } from "lodash";

function Login({ onLogin, isDisabled }: { onLogin: any; isDisabled: boolean }) {
  const [errors, setErrors] = useState({} as any);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLogin(data, setData, setErrors, resetForm);

    resetForm();
  };

  const resetForm = useCallback(
    (
      newData = {
        email: "",
        password: "",
      },
      newErrors = {}
    ) => {
      setData(newData);
      setErrors(newErrors);
    },
    [setData, setErrors]
  );

  const renderFormInputs = (isDisabled: boolean) => {
    const renderFormInput = (
      type: string,
      isDisabled: boolean,
      inputName: string,
      inputNameEng: string,
      value: any,
      errors: any
    ) => {
      return (
        <label
          className="section-with-form__label"
          htmlFor={`${inputNameEng}-register`}
        >
          {inputName}
          <input
            disabled={isDisabled}
            required
            onChange={handleChange}
            value={value}
            type={type}
            name={inputNameEng}
            id={`${inputNameEng}-register`}
            className="section-with-form__input"
            minLength={
              type === "text" ? 2 : type === "password" ? 8 : undefined
            }
            maxLength={type === "text" ? 30 : undefined}
          />
          <span className="section-with-form__error">{errors}</span>
        </label>
      );
    };

    return (
      <>
        {renderFormInput(
          "email",
          isDisabled,
          "E-mail",
          "email",
          data.email,
          errors.email
        )}
        {renderFormInput(
          "password",
          isDisabled,
          "Пароль",
          "password",
          data.password,
          errors.password
        )}
      </>
    );
  };

  const isFormCompleted = () => !!(data.email && data.password);
  const isErrorsInForm = () =>
    !!Object.entries(errors).find(([_key, value]) => value !== "");
  const checkInputsValidation = () => {
    if (isEmpty(errors)) return false; //инициализация формы

    return isFormCompleted() && !isErrorsInForm();
  };

  return (
    <section className="section-with-form">
      <div className="section-with-form__top">
        <Logo />
        <h1 className="section-with-form__title">Рады видеть!</h1>
      </div>
      <form onSubmit={handleSubmit} className="section-with-form__form">
        {renderFormInputs(isDisabled)}
        <ButtonBlock
          content={LOGIN}
          name="login"
          isValid={checkInputsValidation()}
          isDisabled={isDisabled}
        />
      </form>
    </section>
  );
}

export default Login;
