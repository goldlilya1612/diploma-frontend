import React, { ChangeEvent, useState } from "react";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
import { EErrorCode } from "../../enums/error-code.enum";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { renderFormInput } from "../../hooks/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import IncorrectErrorIcon from "../../images/401-error-icon";
import ConflictErrorIcon from "../../images/409-error-icon";
import AccordionIcon from "../../images/accordion-icon";
import CrossPopupIcon from "../../images/cross-popup-icon";
import { ICreateChapterData } from "../../interfaces/formInfo/create-chapter-data.interface";
import { ICreateCourseData } from "../../interfaces/formInfo/create-course-data.interface";
import { IPopupProps } from "../../interfaces/props/popup-props.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { OPTIONS } from "../../utils/constants";
import { createCourse } from "../../utils/mainApi";
import "./Popup.scss";

const Popup: React.FunctionComponent<IPopupProps> = ({
  isOpen,
  onClose,
  message,
  title,
  popupType,
  contentType,
  isUpdatedData,
  setIsUpdatedData,
  popupInfoData,
  popupRequestType,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICreateCourseData>({} as ICreateCourseData);
  const [chapterData, setChapterData] = useState<ICreateChapterData>(
    {} as ICreateChapterData
  );
  const [artcileData, setArticleData] = useState<{ name: string }>(
    {} as { name: string }
  );
  const isCourseFormCompleted = !!(
    data.name &&
    data.category &&
    data.description &&
    data.image
  );
  const isChapterFormCompleted = !!chapterData.name;

  const dispatch = useAppDispatch();
  const { setIsLoading } = appSlice.actions;
  const formData = new FormData();

  const handleCourseFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("image", data.image);

    createCourse(formData, localStorage.getItem("token"))
      .then((res) => {
        console.log("hh");
        navigate(`/courses/${res.data.createdCourse.route}`);
        dispatch(setIsLoading(true));
        onClose();
        setData({
          name: "",
          category: "",
          description: "",
        } as ICreateCourseData);
        setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
      })
      .catch((err: any) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  const handleChapterFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    switch (contentType) {
      case EPopupContentType.COURSE:
        setData({ ...data, [name]: value });
        break;
      case EPopupContentType.CHAPTER:
        setChapterData({ ...chapterData, [name]: value });
        break;
      case EPopupContentType.ARTICLE:
        setArticleData({ ...artcileData, [name]: value });
        break;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setData({ ...data, image: e.target.files[0] });
  };
  const renderCourseContent = () => {
    return (
      <form id="createCourseForm" onSubmit={handleCourseFormSubmit}>
        {renderFormInput(
          "text",
          false,
          "Название курса",
          "name",
          popupRequestType === EPopupRequestType.CREATE_COURSE
            ? data.name
            : popupInfoData.name,
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
              value={
                popupRequestType === EPopupRequestType.CREATE_COURSE
                  ? data.category
                  : popupInfoData.category
              }
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
          popupRequestType === EPopupRequestType.CREATE_COURSE
            ? data.description
            : popupInfoData.description,
          [],
          handleChange
        )}
        <div className="popup__buttons">
          <div className={"popup__file-wrapper"}>
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
              {data.image
                ? `Файл: ${
                    popupRequestType === EPopupRequestType.CREATE_COURSE
                      ? data.image.name
                      : popupInfoData.image
                  }`
                : "Файл не выбран"}
            </p>
          </div>
          <button
            disabled={!isCourseFormCompleted}
            className={`popup__button ${
              isCourseFormCompleted ? "" : "popup__button_disabled"
            }`}
            onClick={handleCourseFormSubmit}
          >
            Создать
          </button>
        </div>
      </form>
    );
  };
  const renderChapterContent = () => {
    return (
      <form id="createChapterForm" onSubmit={handleChapterFormSubmit}>
        {renderFormInput(
          "text",
          false,
          "Название раздела",
          "name",
          popupRequestType === EPopupRequestType.ADD_CHAPTER
            ? chapterData.name
            : //TODO: popupInfoData.name
              "",
          [],
          handleChange
        )}
        <button
          disabled={!isChapterFormCompleted}
          className={`popup__button ${
            isChapterFormCompleted ? "" : "popup__button_disabled"
          }`}
          onClick={handleChapterFormSubmit}
        >
          Создать
        </button>
      </form>
    );
  };

  const renderArticleContent = () => {
    return (
      <form id="createChapterForm" onSubmit={handleChapterFormSubmit}>
        {renderFormInput(
          "text",
          false,
          "Название статьи",
          "name",
          popupRequestType === EPopupRequestType.ADD_CHAPTER
            ? chapterData.name
            : //TODO: popupInfoData.name
              "",
          [],
          handleChange
        )}
        <button
          disabled={!isChapterFormCompleted}
          className={`popup__button ${
            isChapterFormCompleted ? "" : "popup__button_disabled"
          }`}
          onClick={handleChapterFormSubmit}
        >
          Создать
        </button>
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
              {contentType === EPopupContentType.COURSE &&
                renderCourseContent()}
              {contentType === EPopupContentType.CHAPTER &&
                renderChapterContent()}
              {contentType === EPopupContentType.ARTICLE &&
                renderArticleContent()}
            </div>
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
};

export default Popup;
