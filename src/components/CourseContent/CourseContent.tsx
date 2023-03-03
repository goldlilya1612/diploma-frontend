import "./CourseContent.scss";
import { useState } from "react";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/hooks";
import EditIcon from "../../images/edit-icon";
import Accordion from "../Accordion/Accordion";

const CourseContent = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className={"course-content"}>
      <div className="course-content__wrapper">
        <p className="courses__title">Содержание</p>
        {user.role === EUserRole.LECTURER ? (
          <button
            className="empty-button courses__edit-button"
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
          >
            <EditIcon className="courses__edit-icon" />
          </button>
        ) : null}
      </div>
      <Accordion />
    </section>
  );
};

export default CourseContent;
