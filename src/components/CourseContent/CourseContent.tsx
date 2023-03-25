import { useState } from "react";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { useAppSelector } from "../../hooks/hooks";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import Accordion from "../Accordion/Accordion";
import EmptyState from "../EmptyState/EmptyState";
import Popup from "../Popup/Popup";
import "./CourseContent.scss";

const CourseContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const route = window.location.pathname.split("/").reverse()[0];
  const { courses } = useAppSelector((state) => state.appReducer.app);
  const { content } = useAppSelector(
    (state) => state.courseContentReducer.courseContent
  );
  const currentOpenCourse = courses?.find(
    (item: ICourseCardProps) => item.route === route
  );

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
        currentOpenCourse={currentOpenCourse}

        // isUpdatedData={isUpdatedCourseArray}
        // setIsUpdatedData={setIsUpdatedCourseArray}
      />
    </section>
  );
};

export default CourseContent;
