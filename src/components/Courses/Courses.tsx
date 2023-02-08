import Accordion from "../Accordion/Accordion";
import "./Courses.scss";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";

import { useState } from "react";
import Popup from "../Popup/Popup";
import { EPopupType } from "../../enums/popup-type.enum";
import EmptyState from "../EmptyState/EmptyState";

const Courses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //TODO: сделай динамическими
  const isLector = true;
  const content: any = null;

  return (
    <section className="courses">
      {content !== null ? (
        <>
          <div className="courses__wrapper">
            <p className="courses__title">Содержание</p>
            {isLector ? (
              <button
                className="empty-button courses__edit-button"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
              >
                <EditIcon className="courses__edit-icon" />
              </button>
            ) : null}
          </div>
          <Accordion />
        </>
      ) : (
        <EmptyState setIsPopupOpen={setIsPopupOpen} />
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
