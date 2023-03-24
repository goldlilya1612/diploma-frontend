import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import EditIcon from "../../images/edit-icon";
import RemoveItemIcon from "../../images/remove-item-icon";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { deleteCourse } from "../../utils/mainApi";
import "./CourseСard.scss";

const CourseCard = ({
  course,
  setIsPopupOpen,
  isUpdatedCourseArray,
  setIsUpdatedCourseArray,
  setCurrentOpenCourse,
}: {
  course: ICourseCardProps;
  setIsPopupOpen: Dispatch<boolean>;
  isUpdatedCourseArray?: boolean;
  setIsUpdatedCourseArray?: Dispatch<boolean>;
  setCurrentOpenCourse: Dispatch<any>;
}) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const { setIsLoading, setPopupInfo } = appSlice.actions;

  return (
    <article className="course-card">
      <Link className="course-card-link" to={course.route}>
        <img
          className="course-card__image"
          src={course.imageURL}
          alt={"course-picture"}
        />
        <div className="course-card__info">
          <div className="course-card__category-wrapper">
            <p className="course-card__category">{course.category}</p>
            {user.role === EUserRole.LECTURER ? (
              <div className="course-card__buttons">
                <EditIcon
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    dispatch(
                      setPopupInfo({
                        type: EPopupType.CONTENT,
                        title: EPopupTitle.UPDATE_COURSE,
                        requestType: EPopupRequestType.UPDATE_COURSE,
                        content: EPopupContentType.COURSE,
                      })
                    );
                    setCurrentOpenCourse(course);
                    setIsPopupOpen(true);
                  }}
                  className="course-card__button"
                />
                <RemoveItemIcon
                  className="course-card__button"
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    dispatch(setIsLoading(true));
                    deleteCourse(course.id, localStorage.getItem("token"))
                      .then(() => {
                        setIsUpdatedCourseArray &&
                          setIsUpdatedCourseArray(!isUpdatedCourseArray);
                      })
                      .catch((err: any) => {
                        console.log(`Ошибка: ${err}`);
                      })
                      .finally(() => {
                        dispatch(setIsLoading(false));
                      });
                  }}
                />
              </div>
            ) : null}
          </div>

          <p className="course-card__name">{course.name}</p>
          <p className="course-card__description">{course.description}</p>
          <p className="course-card__creator">
            Создатель: {course.creatorName}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CourseCard;
