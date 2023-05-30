import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { renderFormInput } from "../../hooks/helpers";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import Logo from "../Logo/Logo";
import { REGISTER } from "../../utils/constants";
import "./Register.scss";
import {
  IDataRegister,
  IErrorsRegister,
  IGroupRegister,
} from "../../interfaces";
import { EUserRole } from "../../enums/user-role.enum";
import { isEmpty } from "lodash";
import { Reorder } from "framer-motion";
import GroupRegister from "../GroupRegister/GroupRegister";

function Register({
  onRegister,
  isDisabled,
}: {
  onRegister: any;
  isDisabled: boolean;
}) {
  const [errors, setErrors] = useState({} as IErrorsRegister);
  const [value, setValue] = useState(EUserRole.STUDENT);
  const [dataGroups, setDataGroups] = useState<Array<IGroupRegister> | null>(
    null
  );
  const [data, setData] = useState({
    name: "",
    surname: "",
    fathername: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: EUserRole.STUDENT,
    groups: null,
  } as IDataRegister);

  useEffect(() => {
    setData({ ...data, groups: dataGroups });
  }, [dataGroups]);

  const checkGroupsValidation = () => {
    if (data.role === EUserRole.LECTURER) {
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
      data.role &&
      data.passwordConfirm &&
      data.groups
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

    if (name === "role") {
      handleRolesToggle(name, value as EUserRole);
    } else if (name === "groups") {
      value === ""
        ? setData({ ...data, [name]: null })
        : setData({ ...data, [name]: [{ name: value, key: uuidv4() }] });
    } else {
      setData({ ...data, [name]: value });
      if (name === "passwordConfirm" && data.password !== value) {
        setErrors({ ...errors, [name]: "Пароли не совпадают" });
        return;
      }
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };
  const handleRolesToggle = (name: string, value: EUserRole) => {
    setValue(value as EUserRole);
    setData({ ...data, [name]: value });
    if (value === EUserRole.STUDENT) {
      setDataGroups(null);
    } else {
      setDataGroups([{ name: "", key: uuidv4() }]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetForm();
    onRegister(data, setData, setErrors, resetForm);
  };

  const resetForm = useCallback(
    (
      newData = {
        name: "",
        surname: "",
        fathername: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: EUserRole.STUDENT,
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
    return (
      <>
        {renderFormInput(
          "text",
          isDisabled,
          "Фамилия",
          "surname",
          data.surname,
          errors.surname,
          handleChange
        )}
        {renderFormInput(
          "text",
          isDisabled,
          "Имя",
          "name",
          data.name,
          errors.name,
          handleChange
        )}
        {renderFormInput(
          "text",
          isDisabled,
          "Отчество",
          "fathername",
          data.fathername,
          errors.fathername,
          handleChange
        )}
        <label className="section-with-form__label" htmlFor="role-register">
          Статус
          <div className="radio__wrapper">
            <div className="radio">
              <label className="radio__label">
                <input
                  type="radio"
                  name="role"
                  id="role-student-register"
                  value={EUserRole.STUDENT}
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
                  name="role"
                  id="role-lecturer-register"
                  value={EUserRole.LECTURER}
                  checked={value === "lecturer"}
                  onChange={handleChange}
                />
                Преподаватель
              </label>
            </div>
          </div>
        </label>
        {data.role === EUserRole.LECTURER ? (
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
          renderFormInput(
            "text",
            isDisabled,
            "Группа",
            "groups",
            (data?.groups && data?.groups[0].name) || "",
            [],
            handleChange
          )
        )}
        {renderFormInput(
          "email",
          isDisabled,
          "E-mail",
          "email",
          data.email,
          errors.email,
          handleChange
        )}
        {renderFormInput(
          "password",
          isDisabled,
          "Пароль",
          "password",
          data.password,
          errors.password,
          handleChange
        )}
        {renderFormInput(
          "password",
          isDisabled,
          "Повторите пароль",
          "passwordConfirm",
          data.passwordConfirm,
          errors.passwordConfirm,
          handleChange
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
