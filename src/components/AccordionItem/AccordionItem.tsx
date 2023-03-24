import React, { Dispatch, useRef, useState } from "react";
import "./AccordionItem.scss";
import { Link } from "react-router-dom";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import AccordionButtonIcon from "../../images/accordion-button-icon";
import DeleteIcon from "../../images/delete-icon";
import EditIcon from "../../images/edit-icon";
import RemoveItemIcon from "../../images/remove-item-icon";

const AccordionItem = ({
  faq,
  setIsPopupOpen,
  setPopupTitle,
  setPopupRequestType,
}: {
  faq: any;
  setIsPopupOpen: Dispatch<boolean>;
  setPopupTitle: Dispatch<string>;
  setPopupRequestType: Dispatch<EPopupRequestType>;
}) => {
  const { question, answer } = faq;

  const [clicked, setClicked] = useState(false);
  const contentEl = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className={`accordion-item ${clicked ? "accordion-item_clicked" : ""}`}>
      <button
        className={`${clicked ? "button_clicked" : ""} button`}
        onClick={handleToggle}
      >
        <div className="accordion-item__title-wrapper">
          <div className="accordion-item__title-buttons-wrapper">
            <p className="accordion-item__title">{question}</p>
            {EUserRole.LECTURER ? (
              <div className={"accordion-item__buttons"}>
                <EditIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    setPopupTitle("Форма редактирования раздела");
                    setIsPopupOpen(true);
                  }}
                />
                <RemoveItemIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    console.log("remove");
                  }}
                />
              </div>
            ) : null}
          </div>
          <div
            className={`accordion-item__button ${
              clicked ? "accordion-item__button_clicked" : ""
            }`}
          >
            <AccordionButtonIcon isClicked={clicked} />
          </div>
        </div>
        <div
          ref={contentEl}
          className="answer_wrapper"
          style={
            clicked
              ? { height: contentEl.current?.scrollHeight }
              : { height: "0px" }
          }
        >
          {EUserRole.LECTURER ? (
            <button
              className="accordion-item__add-button"
              onClick={(e: React.SyntheticEvent) => {
                e.stopPropagation();
                setPopupRequestType(EPopupRequestType.ADD_CHAPTER);
                setPopupTitle("Форма добавления статьи");
                setIsPopupOpen(true);
              }}
            >
              Добавить статью
            </button>
          ) : null}
          <div>
            <Link to="#" className="answer">
              {answer}
            </Link>
            {EUserRole.LECTURER ? (
              <div className={"accordion-item__buttons"}>
                <EditIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    setPopupTitle("Форма редактирования раздела");
                    setIsPopupOpen(true);
                  }}
                />
                <RemoveItemIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    console.log("remove");
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
};

export default AccordionItem;
