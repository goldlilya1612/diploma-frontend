import { EUserRole } from "../../enums/user-role.enum";
import { EMPTY_STATE } from "../../utils/constants";
import Accordion from "../Accordion/Accordion";
import "./Courses.scss";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";

import { useState } from "react";
import Popup from "../Popup/Popup";
import { EPopupType } from "../../enums/popup-type.enum";
import EmptyState from "../EmptyState/EmptyState";
import { useAppSelector } from "../../hooks/hooks";

const Courses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { role } = useAppSelector((state) => state.userReducer.user);

  //TODO: сделай динамическими
  // const content: any = [];
  const content = [
    {
      name: "Frontend",
      img: "",
      category: "Разработка",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed risus nunc. Etiam fermentum sapien ac risus placerat, vel euismod ex accumsan. Integer in consectetur diam. Nullam bibendum nisi et efficitur ultricies. Quisque non elementum ante. Mauris feugiat nisl eu enim faucibus, at laoreet odio luctus. Mauris quis magna tortor.",
    },
    {
      name: "Frontend",
      img: "",
      category: "Разработка",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed risus nunc. Etiam fermentum sapien ac risus placerat, vel euismod ex accumsan. Integer in consectetur diam. Nullam bibendum nisi et efficitur ultricies. Quisque non elementum ante. Mauris feugiat nisl eu enim faucibus, at laoreet odio luctus. Mauris quis magna tortor.",
    },
    {
      name: "Frontend",
      img: "",
      category: "Разработка",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed risus nunc. Etiam fermentum sapien ac risus placerat, vel euismod ex accumsan. Integer in consectetur diam. Nullam bibendum nisi et efficitur ultricies. Quisque non elementum ante. Mauris feugiat nisl eu enim faucibus, at laoreet odio luctus. Mauris quis magna tortor.",
    },
  ];

  return (
    <section className={`courses ${content ? "courses_grid" : ""}`}>
      {content !== null && role !== EUserRole.STUDENT ? (
        <></>
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
        title={"Содержание"}
        onClose={() => setIsPopupOpen(false)}
        popupType={"content" as EPopupType}
      />
    </section>
  );
};

export default Courses;
