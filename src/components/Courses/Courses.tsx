import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { EMPTY_STATE } from "../../utils/constants";
import Accordion from "../Accordion/Accordion";
import "./Courses.scss";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";

import { useState } from "react";
import CourseCard from "../CourseCard/CourseСard";
import Popup from "../Popup/Popup";
import { EPopupType } from "../../enums/popup-type.enum";
import EmptyState from "../EmptyState/EmptyState";
import { useAppSelector } from "../../hooks/hooks";

const Courses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useAppSelector((state) => state.userReducer.user);

  //TODO: сделай динамическими
  const content: any = null;
  // const content = [
  //   {
  //     id: 1,
  //     name: "Frontend",
  //     creatorId: "ddjkdjk",
  //     creatorName: "Смирнов Владимир Юрьевич",
  //     image: "",
  //     category: "Разработка",
  //     description:
  //       "et odio luctus. Mauris quis magna tortor. fjifdjkdjkdjf flkglfkl gfklfklf g;lf;fl ghjkl;';lkjhgfghjkl testtesttesttesttesttesttesttestvtesttesttesttesttesttesttesttesttesttesttest",
  //     route: "dkldkld",
  //     createAt: "jhjlkjh",
  //     updateAt: "ghjklkjh",
  //   },
  //   {
  //     id: 2,
  //     name: "Frontend",
  //     creatorId: "ddjkdjk",
  //     creatorName: "Смирнов Владимир Юрьевич",
  //     image: "",
  //     category: "Разработка",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed risus nunc. Etiam fermentum sapien ac risus placerat, vel euismod ex accumsan. Integer in consectetur diam. Nullam bibendum nisi et efficitur ultricies. Quisque non elementum ante. Mauris feugiat nisl eu enim faucibus, at laoreet odio luctus. Mauris quis magna tortor.",
  //     route: "dkldkld",
  //     createAt: "jhjlkjh",
  //     updateAt: "ghjklkjh",
  //   },
  //   {
  //     id: 3,
  //     name: "Frontend",
  //     creatorId: "ddjkdjk",
  //     creatorName: "Смирнов Владимир Юрьевич",
  //     image: "",
  //     category: "Разработка",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed risus nunc. Etiam fermentum sapien ac risus placerat, vel euismod ex accumsan. Integer in consectetur diam. Nullam bibendum nisi et efficitur ultricies. Quisque non elementum ante. Mauris feugiat nisl eu enim faucibus, at laoreet odio luctus. Mauris quis magna tortor.",
  //     route: "dkldkld",
  //     createAt: "jhjlkjh",
  //     updateAt: "ghjklkjh",
  //   },
  // ];

  return (
    <section className={`courses ${content ? "courses_grid" : ""}`}>
      {content !== null && user.role !== EUserRole.STUDENT ? (
        content?.map((course: ICourseCardProps) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
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
        <EmptyState
          text={EMPTY_STATE.courses}
          setIsPopupOpen={setIsPopupOpen}
        />
      )}
      <Popup
        isOpen={isPopupOpen}
        title={"Форма создания курса"}
        onClose={() => setIsPopupOpen(false)}
        popupType={"content" as EPopupType}
        contentType={"course" as EPopupContentType}
      />
    </section>
  );
};

export default Courses;
