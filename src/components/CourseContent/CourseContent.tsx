import "./CourseContent.scss";
import { useState } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/hooks";
import EditIcon from "../../images/edit-icon";
import Accordion from "../Accordion/Accordion";
import EmptyState from "../EmptyState/EmptyState";
import Popup from "../Popup/Popup";

const CourseContent = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupRequestType, setPopupRequestType] = useState<EPopupRequestType>(
    "" as EPopupRequestType
  );
  const content = [""] as any;
  return (
    <section className={"course-content"}>
      <div className="course-content__wrapper">
        {Array.isArray(content) && content?.length > 0 && (
          <>
            <div className="courses__title-wrapper">
              <p className="course-content__title">Содержание</p>
              {/*{user.role === EUserRole.LECTURER ? (*/}
              {/*  <button*/}
              {/*    className="empty-button course-content__edit-button"*/}
              {/*    onClick={() => {*/}
              {/*      setIsPopupOpen(!isPopupOpen);*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <EditIcon className="courses__edit-icon" />*/}
              {/*  </button>*/}
              {/*) : null}*/}
            </div>
            <Accordion
              setIsPopupOpen={setIsPopupOpen}
              setPopupRequestType={setPopupRequestType}
            />
          </>
        )}
        {(content === null || content.length === 0) && (
          <EmptyState
            text={"Содержание курса пустое"}
            setIsPopupOpen={setIsPopupOpen}
          />
        )}
      </div>
      <Popup
        isOpen={isPopupOpen}
        title={
          popupRequestType === EPopupRequestType.ADD_CHAPTER
            ? "Форма добавления раздела"
            : "Форма редактирования раздела"
        }
        onClose={() => setIsPopupOpen(false)}
        popupType={"content" as EPopupType}
        contentType={"chapter" as EPopupContentType}
        // isUpdatedData={isUpdatedCourseArray}
        // setIsUpdatedData={setIsUpdatedCourseArray}
        // popupInfoData={currentOpenPopupCourse}
        // popupRequestType={popupRequestType}
      />
    </section>
  );
};

export default CourseContent;
