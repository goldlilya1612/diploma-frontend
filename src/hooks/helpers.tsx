export const renderFormInput = (
  type: string,
  isDisabled: boolean,
  inputName: string,
  inputNameEng: string,
  value: any,
  errors: any = [],
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
        className={`section-with-form__input ${
          isDisabled ? "section-with-form__input_disabled" : ""
        }`}
        minLength={type === "text" ? 2 : type === "password" ? 8 : undefined}
        // maxLength={type === "text" ? 30 : undefined}
      />
      <span className="section-with-form__error">{errors}</span>
    </label>
  );
};
