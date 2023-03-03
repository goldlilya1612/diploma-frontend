import { omit } from "lodash";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import AddIcon from "../../images/add-icon";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { EMPTY_STATE } from "../../utils/constants";
import { getCourses } from "../../utils/mainApi";
import Accordion from "../Accordion/Accordion";
import "./Courses.scss";

import { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseСard";
import Popup from "../Popup/Popup";
import { EPopupType } from "../../enums/popup-type.enum";
import EmptyState from "../EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Courses = () => {
  const dispatch = useAppDispatch();
  const { setIsLoading } = appSlice.actions;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [coursesArray, setCoursesArray] =
    useState<Array<ICourseCardProps> | null>(null);
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(setIsLoading(true));
    getCourses(localStorage.getItem("token"))
      .then((res: any) => {
        const newCoursesArray = res.data.courses.map((course: any) =>
          omit(course, ["creatorID", "createdAt"])
        );
        setCoursesArray(newCoursesArray);
      })
      .catch((err: any) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, []);

  return (
    <section className={`courses`}>
      {Array.isArray(coursesArray) ? (
        <div className={"courses__title-wrapper"}>
          <h1 className={"courses__title"}>Курсы</h1>
          {user.role === EUserRole.LECTURER ? (
            <AddIcon className={"courses__title-icon"} />
          ) : null}
        </div>
      ) : null}
      <div
        className={`courses__wrapper ${
          coursesArray ? "courses__wrapper_grid" : ""
        }`}
      >
        {Array.isArray(coursesArray) &&
          coursesArray?.length &&
          coursesArray?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

        {Array.isArray(coursesArray) && !coursesArray.length && (
          <EmptyState
            text={EMPTY_STATE.courses}
            setIsPopupOpen={setIsPopupOpen}
          />
        )}

        {/*{!Array.isArray(coursesArray) ? null : coursesArray?.length ? (*/}
        {/*  coursesArray?.map((course) => (*/}
        {/*    <CourseCard key={course.id} course={course} />*/}
        {/*  ))*/}
        {/*) : (*/}
        {/*  <EmptyState*/}
        {/*    text={EMPTY_STATE.courses}*/}
        {/*    setIsPopupOpen={setIsPopupOpen}*/}
        {/*  />*/}
        {/*)}*/}
        {
          // <>
          //   <div className="courses__wrapper">
          //     <p className="courses__title">Содержание</p>
          //     {role === EUserRole.LECTURER ? (
          //       <button
          //         className="empty-button courses__edit-button"
          //         onClick={() => setIsPopupOpen(!isPopupOpen)}
          //       >
          //         <EditIcon className="courses__edit-icon" />
          //       </button>
          //     ) : null}
          //   </div>
          //   <Accordion />
          // </>
        }
        <Popup
          isOpen={isPopupOpen}
          title={"Форма создания курса"}
          onClose={() => setIsPopupOpen(false)}
          popupType={"content" as EPopupType}
          contentType={"course" as EPopupContentType}
        />
      </div>
    </section>
  );
};

export default Courses;
