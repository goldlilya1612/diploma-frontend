import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { REGISTER } from "../../utils/constants";
import "./Register.css";
import {
  IDataRegister,
  IErrorsRegister,
  IGroupRegister,
} from "../../interfaces";
import { EUserStatus } from "../../enums/user-statuses.enum";
import { isEmpty } from "lodash";
import { Reorder } from "framer-motion";
import GroupRegister from "../GroupRegister/GroupRegister";

function Register({
  onRegister,
  isDisabled,
}: {
  onRegister: any;
  isDisabled: any;
}) {
  const [errors, setErrors] = useState({} as IErrorsRegister);
  const [value, setValue] = useState(EUserStatus.STUDENT);
  const [dataGroups, setDataGroups] = useState<Array<IGroupRegister> | null>(
    null
  );
  const [data, setData] = useState({
    name: "",
    surname: "",
    fathername: "",
    email: "",
    password: "",
    status: EUserStatus.STUDENT,
    groups: null,
  } as IDataRegister);

  useEffect(() => {
    setData({ ...data, groups: dataGroups });
  }, [dataGroups]);

  const checkGroupsValidation = () => {
    if (data.status === EUserStatus.LECTOR) {
      return !data.groups?.find((group) => group.name === "");
    } else return true;
  };

  const isFormCompleted = () =>
    !!(
      data.name &&
      data.surname &&
      data.fathername &&
      data.email &&
      data.password &&
      data.status
    );
  const isErrorsInForm = () =>
    !!Object.entries(errors).find(([_key, value]) => value !== "");
  const checkInputsValidation = () => {
    if (isEmpty(errors)) return false; //инициализация формы

    return isFormCompleted() && !isErrorsInForm();
  };

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
    setData({ ...data, [name]: value });
    if (value === EUserStatus.STUDENT) {
      setDataGroups(null);
    } else {
      setDataGroups([{ name: "", key: uuidv4() }]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetForm();
    onRegister(setData, setErrors, resetForm);
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
      newErrors = {}
    ) => {
      setData(newData);
      setErrors(newErrors as IErrorsRegister);
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
          "text",
          isDisabled,
          "Имя",
          "name",
          data.name,
          errors.name
        )}
        {renderFormInput(
          "text",
          isDisabled,
          "Фамилия",
          "surname",
          data.surname,
          errors.surname
        )}
        {renderFormInput(
          "text",
          isDisabled,
          "Отчество",
          "fathername",
          data.fathername,
          errors.fathername
        )}
        <label className="section-with-form__label" htmlFor="role-register">
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
            {dataGroups && (
              <Reorder.Group
                as="ol"
                axis="y"
                values={dataGroups}
                onReorder={setDataGroups}
                style={{
                  listStyleType: "none",
                  paddingLeft: "0px",
                  margin: "0px",
                }}
              >
                {dataGroups.map((group) => (
                  <GroupRegister
                    key={group.key}
                    group={group}
                    dataGroups={dataGroups}
                    setDataGroups={setDataGroups}
                  />
                ))}
              </Reorder.Group>
            )}
          </section>
        ) : (
          ""
        )}
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

  return (
    <section className="section-with-form">
      <div className="section-with-form__top">
        <Logo />
        <h1 className="section-with-form__title">Добро пожаловать!</h1>
      </div>
      <form
        autoComplete={"off"}
        onSubmit={handleSubmit}
        className="section-with-form__form"
      >
        {renderFormInputs(isDisabled)}
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
