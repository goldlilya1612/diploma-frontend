import Accordion from "../Accordion/Accordion";
import "./Courses.scss";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";

import { useState } from "react";
import Popup from "../Popup/Popup";
import { EPopupType } from "../../enums/popup-type.enum";
import EmptyState from "../EmptyState/EmptyState";
import {useAppSelector} from "../../hooks/hooks";
import {EUserStatus} from "../../enums/user-statuses.enum";

const Courses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {status} = useAppSelector(state => state.userReducer.user)

  //TODO: сделай динамическими
  const content: any = [];

  return (
    <section className="courses">
      {content !== null && status !== EUserStatus.STUDENT ? (
        <>
          <div className="courses__wrapper">
            <p className="courses__title">Содержание</p>
            {status === EUserStatus.LECTOR ? (
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
