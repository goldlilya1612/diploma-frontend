import React, { ChangeEvent, useState } from "react";
import { EErrorCode } from "../../enums/error-code.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { renderFormInput } from "../../hooks/helpers";
import { useAppSelector } from "../../hooks/hooks";
import IncorrectErrorIcon from "../../images/401-error-icon";
import ConflictErrorIcon from "../../images/409-error-icon";
import AccordionIcon from "../../images/accordion-icon";
import CrossPopupIcon from "../../images/cross-popup-icon";
import "./Popup.scss";
import { IGroupRegister } from "../../interfaces";
import { ICreateCourseData } from "../../interfaces/formInfo/create-course-data.interface";
import Dropdown, { Option } from "react-dropdown";
import { createCourse } from "../../utils/auth";
import { OPTIONS } from "../../utils/constants";

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
  const isFormCompleted = !!(
    data.name &&
    data.category &&
    data.description &&
    data.image
  );
  const user = useAppSelector((state) => state.userReducer.user);
  const formData = new FormData();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    formData.append("creatorId", user.id as string);
    formData.append("creatorName", user.name as string);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("image", data.image);

    console.log(data);

    createCourse(
      /*formData*/ {
        ...data,
        creatorId: user.id,
        creatorName: user.name,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        onClose();
        setData({
          name: "",
          category: "",
          description: "",
        } as ICreateCourseData);
        console.log(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setData({ ...data, image: /*e.target.files[0]*/ e.target.files[0].name });
  };
  const renderCourseContent = () => {
    return (
      <form id="createCourseForm" onSubmit={handleSubmit}>
        {renderFormInput(
          "text",
          false,
          "Название курса",
          "name",
          data.name,
          [],
          handleChange
        )}
        <label
          className="section-with-form__label"
          htmlFor={`category-register`}
        >
          Категория
          <div style={{ position: "relative" }}>
            <Dropdown
              placeholder=" "
              className="popup__dropdown-wrapper"
              controlClassName="popup__dropdown"
              placeholderClassName="popup__dropdown-placeholder"
              menuClassName="popup__dropdown-menu"
              onChange={(option) => {
                setData({ ...data, category: option.value });
              }}
              value={data.category}
              options={OPTIONS}
            />
            <AccordionIcon className="popup__dropdown-arrow" />
          </div>
        </label>
        {renderFormInput(
          "text",
          false,
          "Описание",
          "description",
          data.description,
          [],
          handleChange
        )}
        <div className="popup__buttons">
          <div>
            <input
              type="file"
              id="file"
              accept="image/*,.png,.jpg,.jpeg,.gif"
              className="popup__button"
              onChange={handleFileChange}
            />
            <div className="popup__button">
              <label className="popup__button_file" htmlFor="file">
                Загрузить картинку
              </label>
            </div>
            <p className="popup__button_file-text">
              {data.image ? `Файл: ${data.image.name}` : "Файл не выбран"}
            </p>
          </div>
          <button
            disabled={!isFormCompleted}
            className={`popup__button ${
              isFormCompleted ? "" : "popup__button_disabled"
            }`}
            type="submit"
          >
            Создать
          </button>
        </div>
      </form>
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
          onClick={() => {
            onClose();
            setData({
              name: "",
              category: "",
              description: "",
            } as ICreateCourseData);
          }}
        >
          <CrossPopupIcon />
        </button>
        {renderPopupContent(popupType)}
      </div>
    </div>
  );
}

export default Popup;
