import { useCallback } from 'react';
import ButtonBlock from '../ButtonBlock/ButtonBlock';
import Logo from '../Logo/Logo';
import { REGISTER } from '../../utils/constants';
import { useState } from 'react';
import './Register.css';
import { IErrorsRegister, IDataRegister } from '../../interfaces';

function Register({
  onRegister,
  isDisabled
}: {
  onRegister: any;
  isDisabled: any;
}) {
  const [errors, setErrors] = useState({} as IErrorsRegister);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({
    name: '',
    surname: '',
    fathername: '',
    email: '',
    password: '',
    status: 'student',
    groups: null
  } as IDataRegister);
  const [value, setValue] = useState('student');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    setData({ ...data, [name]: value });
    if (name !== 'status') {
      setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      setValue(value);
    }
    setIsValid((target.closest('form') as HTMLFormElement).checkValidity());
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetForm();
    onRegister(data, setData, setIsValid, setErrors, resetForm);
  };

  const resetForm = useCallback(
    (
      newData = {
        name: '',
        surname: '',
        fathername: '',
        email: '',
        password: '',
        status: 'student',
        groups: null
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
        <label className="section-with-form__label" htmlFor="name-register">
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
          <span className="section-with-form__error">{errors.name}</span>
        </label>
        <label className="section-with-form__label" htmlFor="surname-register">
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
          <span className="section-with-form__error">{errors.surname}</span>
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
          <span className="section-with-form__error">{errors.fathername}</span>
        </label>
        <label className="section-with-form__label" htmlFor="role-register">
          Статус
          <div className="radio__wrapper">
            <div className="radio">
              <label className="radio__label">
                <input
                  type="radio"
                  name="status"
                  id="status-student-register"
                  value="student"
                  checked={value === 'student' ? true : false}
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
                  value="lector"
                  checked={value === 'lector' ? true : false}
                  onChange={handleChange}
                />
                Преподаватель
              </label>
            </div>
          </div>
        </label>
        <label className="section-with-form__label" htmlFor="email-register">
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
          <span className="section-with-form__error">{errors.email}</span>
        </label>
        <label className="section-with-form__label" htmlFor="password-register">
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
          <span className="section-with-form__error">{errors.password}</span>
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
