import { omit } from "lodash";
import { useEffect, useState } from "react";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { userSlice } from "../../store/reducers/UserSlice";
import { getCourse } from "../../utils/mainApi";
import Accordion from "../Accordion/Accordion";
import EmptyState from "../EmptyState/EmptyState";
import Popup from "../Popup/Popup";
import "./CourseContent.scss";

const CourseContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdatedChapterArray, setIsUpdatedChapterArray] =
    useState<boolean>(false);
  const route = window.location.pathname.split("/").reverse()[0];
  const { courses, isLoading } = useAppSelector(
    (state) => state.appReducer.app
  );
  const [content, setContent] = useState<any>(null);

  const dispatch = useAppDispatch();
  const { setIsLoading, setCourses } = appSlice.actions;

  useEffect(() => {
    const currentOpenCourse = courses?.find(
      (item: ICourseCardProps) => item.route === route
    );

    if (currentOpenCourse) {
      dispatch(setIsLoading(false));
      getCourse(currentOpenCourse?.id, localStorage.getItem("token"))
        .then((res: any) => {
          setContent(res.data.courses[0].chapters);
        })
        .catch((err: any) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => dispatch(setIsLoading(false)));
    }
  }, [courses, isUpdatedChapterArray]);

  return (
    <section className={"course-content"}>
      <div className="course-content__wrapper">
        {content && Array.isArray(content) && content.length > 0 && (
          <>
            <div className="courses__title-wrapper">
              <p className="course-content__title">Содержание</p>
            </div>
            <Accordion
              isUpdatedChapterArray={isUpdatedChapterArray}
              setIsUpdatedChapterArray={setIsUpdatedChapterArray}
              content={content}
              setIsPopupOpen={setIsPopupOpen}
            />
          </>
        )}
        {(content?.length === 0 || content === null) && !isLoading && (
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
        isUpdatedData={isUpdatedChapterArray}
        setIsUpdatedData={setIsUpdatedChapterArray}
      />
    </section>
  );
};

export default CourseContent;
