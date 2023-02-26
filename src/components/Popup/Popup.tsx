import React, { useState } from "react";
import { EErrorCode } from "../../enums/error-code.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { renderFormInput } from "../../hooks/helpers";
import IncorrectErrorIcon from "../../images/401-error-icon";
import ConflictErrorIcon from "../../images/409-error-icon";
import CrossPopupIcon from "../../images/cross-popup-icon";
import "./Popup.scss";
import { IGroupRegister } from "../../interfaces";
import { ICreateCourseData } from "../../interfaces/formInfo/create-course-data.interface";

function Popup({
  isOpen,
  onClose,
  message,
  title,
  popupType,
  contentType,
}: {
  isOpen: boolean;
  onClose: any;
  message?: { name: string; code: number };
  title?: string;
  popupType: EPopupType;
  contentType?: EPopupContentType;
}) {
  const [data, setData] = useState<ICreateCourseData>({} as ICreateCourseData);
  // const [courseСhapters, setCourseСhapters] = useState([""] as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    setData({ ...data, [name]: value });
    console.log(data);
    // if (name === "role") {
    //   handleGroupsChange(name, value as EUserRole);
    // } else {
    //   setData({ ...data, [name]: value });
    //   if (name === "passwordConfirm" && data.password !== value) {
    //     setErrors({ ...errors, [name]: "Пароли не совпадают" });
    //     return;
    //   }
    //   setErrors({ ...errors, [name]: target.validationMessage });
    // }
  };

  const renderCourseContent = () => {
    return (
      <>
        {renderFormInput(
          "text",
          false,
          "Название курса",
          "name",
          data.name,
          [],
          handleChange
        )}
        {renderFormInput(
          "text",
          false,
          "Категория",
          "category",
          "",
          [],
          handleChange
        )}
        {renderFormInput(
          "text",
          false,
          "Описание",
          "description",
          "",
          [],
          handleChange
        )}
      </>
    );
  };
  const renderPopupContent = (popupType: EPopupType) => {
    switch (popupType) {
      case EPopupType.ERROR:
        return (
          <>
            <p className="popup__text">{message?.name}</p>
            {message && renderPopupImage(message)}
          </>
        );
      case EPopupType.CONTENT:
        return (
          <>
            <h2 className="popup__text">{title}</h2>
            <div className="popup__content">
              {contentType === EPopupContentType.COURSE ? (
                renderCourseContent()
              ) : (
                <h1>chapter</h1>
              )}
            </div>

            {/*<Reorder.Group*/}
            {/*  as="ol"*/}
            {/*  axis="y"*/}
            {/*  values={courseСhapters}*/}
            {/*  onReorder={setCourseСhapters}*/}
            {/*  style={{*/}
            {/*    listStyleType: "none",*/}
            {/*    paddingLeft: "0px",*/}
            {/*    margin: "0px",*/}
            {/*    width: "100%",*/}
            {/*    overflow: "auto",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {courseСhapters.map((chapter: any) => (*/}
            {/*    <CoursesChapter*/}
            {/*      key={chapter.key}*/}
            {/*      chapter={chapter}*/}
            {/*      courseСhapters={courseСhapters}*/}
            {/*      setCoursesСhapter={setCourseСhapters}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</Reorder.Group>*/}
          </>
        );
    }
  };

  const renderPopupImage = ({ code }: { code: number }) => {
    switch (code) {
      case EErrorCode.ERROR_409: {
        return <ConflictErrorIcon className={`popup__image`} />;
      }
      case EErrorCode.ERROR_401 || EErrorCode.ERROR_400: {
        return <IncorrectErrorIcon className={`popup__image`} />;
      }
    }
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div
        className={`popup__container ${
          popupType === EPopupType.ERROR
            ? "popup__container_error"
            : "popup__container_content"
        }`}
      >
        <button
          type="button"
          className={`popup__close-button`}
          onClick={onClose}
        >
          <CrossPopupIcon />
        </button>
        {renderPopupContent(popupType)}
      </div>
    </div>
  );
}

export default Popup;
