import React, { ChangeEvent, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
import { EErrorCode } from "../../enums/error-code.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { renderFormInput } from "../../hooks/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import IncorrectErrorIcon from "../../images/401-error-icon";
import ConflictErrorIcon from "../../images/409-error-icon";
import AccordionIcon from "../../images/accordion-icon";
import CrossPopupIcon from "../../images/cross-popup-icon";
import { IPopupInfo } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { IPopupProps } from "../../interfaces/props/popup-props.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { OPTIONS } from "../../utils/constants";
import {
  createArticle,
  createChapter,
  createCourse,
  updateArticle,
  updateChapter,
  updateCourse,
} from "../../utils/mainApi";
import "./Popup.scss";

const Popup: React.FunctionComponent<IPopupProps> = ({
  isOpen,
  onClose,
  message,
  isUpdatedData,
  setIsUpdatedData,
  popupInfoData,
  currentOpenCourse,
}) => {
  const { courses } = useAppSelector((state) => state.appReducer.app);
  const { popupInfo } = useAppSelector((state) => state.appReducer.app);
  const dispatch = useAppDispatch();
  const { setIsLoading, setPopupInfo, setCourses } = appSlice.actions;
  const navigate = useNavigate();
  const [data, setData] = useState<any>(popupInfoData || null);
  const [chapterData, setChapterData] = useState<any>(null);
  const [artcileData, setArticleData] = useState<any>(null);

  const isCourseFormCompleted = !!(
    data?.name &&
    data?.category &&
    data?.description &&
    data?.image
  );
  const isChapterFormCompleted = !!chapterData?.name;
  const isArticleFormCompleted = !!artcileData?.name;
  const formData = new FormData();
  const route = window.location.pathname.split("/").reverse()[0];
  const currentCourse = courses?.find((course) => course.route === route);

  useEffect(() => {
    const info = popupInfo.info;
    switch (popupInfo.content) {
      case EPopupContentType.COURSE:
        setData(
          info
            ? {
                name: info.name,
                category: info.category,
                description: info.description,
                image: info.image,
                id: info.id,
              }
            : null
        );
        break;
      case EPopupContentType.CHAPTER:
        setChapterData(
          info
            ? {
                name: info.name,
                id: info.id,
              }
            : null
        );
        break;

      case EPopupContentType.ARTICLE:
        setArticleData(
          info
            ? {
                chapterID: info.chapterID,
                name: info.name,
                id: info.id,
              }
            : null
        );
        break;
    }
  }, [popupInfo.info]);
  const handleCourseFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("name", data?.name);
    if (data?.image instanceof File) {
      formData.append("image", data?.image);
    }
    if (data?.id) {
      formData.append("id", data?.id);
    }
    if (popupInfo?.requestType?.includes("create")) {
      dispatch(setIsLoading(true));
      createCourse(formData, localStorage.getItem("token"))
        .then(({ data }) => {
          courses
            ? dispatch(
                setCourses([
                  ...(courses as Array<ICourseCardProps>),
                  data.createdCourse,
                ])
              )
            : dispatch(setCourses([data.createdCourse]));
          navigate(`/courses/${data.createdCourse.route}`);
          onClose();
          setData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setIsLoading(true));
      updateCourse(formData, localStorage.getItem("token"))
        .then((res) => {
          onClose();
          setData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };
  const handleChapterFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { ...chapterData, courseID: currentCourse?.id };

    if (popupInfo?.requestType?.includes("create")) {
      dispatch(setIsLoading(true));
      createChapter(data, localStorage.getItem("token"))
        .then(() => {
          onClose();
          setChapterData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setIsLoading(true));
      updateChapter(chapterData, localStorage.getItem("token"))
        .then(() => {
          onClose();
          setChapterData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };

  const handleArticleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (popupInfo?.requestType?.includes("create")) {
      dispatch(setIsLoading(true));
      createArticle(artcileData, localStorage.getItem("token"))
        .then(({ data }) => {
          onClose();
          setArticleData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
          navigate(`/courses/create-article/${data.createdArticle.id}`);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setIsLoading(true));
      updateArticle(artcileData, localStorage.getItem("token"))
        .then(() => {
          onClose();
          setArticleData(null);
          dispatch(setPopupInfo({} as IPopupInfo));
          setIsUpdatedData && setIsUpdatedData(!isUpdatedData);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    switch (popupInfo.content) {
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
          data?.name,
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
              value={data?.category}
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
          data?.description,
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
              {data?.image?.name || data?.image?.Name
                ? `Файл: ${data?.image?.name || data?.image?.Name}`
                : "Файл не выбран"}
            </p>
          </div>
          <button
            disabled={!isCourseFormCompleted}
            className={`popup__button ${
              isCourseFormCompleted ? "" : "popup__button_disabled"
            }`}
            type={"submit"}
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
          chapterData?.name,
          [],
          handleChange
        )}
        <button
          disabled={!isChapterFormCompleted}
          className={`popup__button ${
            isChapterFormCompleted ? "" : "popup__button_disabled"
          }`}
          type="submit"
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
          artcileData?.name,
          [],
          handleChange
        )}
        <button
          disabled={!isArticleFormCompleted}
          className={`popup__button ${
            isArticleFormCompleted ? "" : "popup__button_disabled"
          }`}
          onClick={handleArticleFormSubmit}
        >
          Создать
        </button>
      </form>
    );
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
            <h2 className="popup__text">{popupInfo.title}</h2>
            <div className="popup__content">
              {popupInfo.content === EPopupContentType.COURSE &&
                renderCourseContent()}
              {popupInfo.content === EPopupContentType.CHAPTER &&
                renderChapterContent()}
              {popupInfo.content === EPopupContentType.ARTICLE &&
                renderArticleContent()}
            </div>
          </>
        );
    }
  };
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div
        className={`popup__container ${
          popupInfo.type === EPopupType.ERROR
            ? "popup__container_error"
            : "popup__container_content"
        }`}
      >
        <button
          type="button"
          className={`popup__close-button`}
          onClick={() => {
            setData(null);
            setChapterData(null);
            setArticleData(null);
            dispatch(setPopupInfo({} as IPopupInfo));
            onClose();
          }}
        >
          <CrossPopupIcon />
        </button>
        {renderPopupContent(popupInfo.type)}
      </div>
    </div>
  );
};

export default Popup;
