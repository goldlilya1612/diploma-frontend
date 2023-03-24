import { omit } from "lodash";
import { useEffect, useState } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AddIcon from "../../images/add-icon";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { EMPTY_STATE } from "../../utils/constants";
import { getCourses } from "../../utils/mainApi";
import CourseCard from "../CourseCard/CourseСard";
import EmptyState from "../EmptyState/EmptyState";
import Popup from "../Popup/Popup";
import "./Courses.scss";

const Courses = () => {
  const dispatch = useAppDispatch();
  const { setIsLoading, setPopupInfo } = appSlice.actions;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOpenPopupCourse, setCurrentOpenPopupCourse] = useState({});
  const [coursesArray, setCoursesArray] =
    useState<Array<ICourseCardProps> | null>(null);
  const [isUpdatedCourseArray, setIsUpdatedCourseArray] =
    useState<boolean>(false);
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(setIsLoading(true));
    getCourses(localStorage.getItem("token"))
      .then((res: any) => {
        if (Array.isArray(res.data.courses)) {
          const newCoursesArray = res.data.courses.map((course: any) =>
            omit(course, ["creatorID", "createdAt"])
          );
          setCoursesArray(newCoursesArray);
        } else setCoursesArray(res.data.courses);
      })
      .catch((err: any) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [isUpdatedCourseArray]);

  return (
    <section className={`courses`}>
      {Array.isArray(coursesArray) ? (
        <div className={"courses__title-wrapper"}>
          <h1 className={"courses__title"}>Курсы</h1>
          {user.role === EUserRole.LECTURER ? (
            <button className={"courses__add-button"}>
              <AddIcon
                onClick={() => {
                  dispatch(
                    setPopupInfo({
                      type: EPopupType.CONTENT,
                      title: EPopupTitle.CREATE_COURSE,
                      requestType: EPopupRequestType.CREATE_COURSE,
                      content: EPopupContentType.COURSE,
                    })
                  );
                  setIsPopupOpen(!isPopupOpen);
                }}
                className={"courses__title-icon"}
              />
            </button>
          ) : null}
        </div>
      ) : null}
      <div className={"courses__main-wrapper"}>
        <div
          className={`courses__wrapper ${
            coursesArray ? "courses__wrapper_grid" : ""
          }`}
        >
          {Array.isArray(coursesArray) &&
            coursesArray?.length &&
            coursesArray?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                setIsPopupOpen={setIsPopupOpen}
                isUpdatedCourseArray={isUpdatedCourseArray}
                setIsUpdatedCourseArray={setIsUpdatedCourseArray}
                setCurrentOpenCourse={setCurrentOpenPopupCourse}
              />
            ))}

          {(coursesArray === null || !coursesArray.length) && (
            <EmptyState
              text={EMPTY_STATE.courses}
              setIsPopupOpen={setIsPopupOpen}
              content={EPopupContentType.COURSE}
              title={EPopupTitle.CREATE_COURSE}
            />
          )}
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            isUpdatedData={isUpdatedCourseArray}
            setIsUpdatedData={setIsUpdatedCourseArray}
            popupInfoData={currentOpenPopupCourse}
          />
        </div>
      </div>
    </section>
  );
};

export default Courses;
