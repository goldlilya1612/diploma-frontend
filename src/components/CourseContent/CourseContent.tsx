import { useState } from "react";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import Accordion from "../Accordion/Accordion";
import EmptyState from "../EmptyState/EmptyState";
import Popup from "../Popup/Popup";
import "./CourseContent.scss";

const CourseContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const content = [""] as any;
  const content = null as any;
  return (
    <section className={"course-content"}>
      <div className="course-content__wrapper">
        {Array.isArray(content) && content?.length > 0 && (
          <>
            <div className="courses__title-wrapper">
              <p className="course-content__title">Содержание</p>
            </div>
            <Accordion setIsPopupOpen={setIsPopupOpen} />
          </>
        )}
        {(content === null || content.length === 0) && (
          <EmptyState
            text={"Содержание курса пустое"}
            setIsPopupOpen={setIsPopupOpen}
            content={EPopupContentType.CHAPTER}
            title={EPopupTitle.CREATE_CHAPTER}
          />
        )}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        // contentType={"article" as EPopupContentType}

        // isUpdatedData={isUpdatedCourseArray}
        // setIsUpdatedData={setIsUpdatedCourseArray}
        // popupInfoData={currentOpenPopupCourse}
      />
    </section>
  );
};

export default CourseContent;
