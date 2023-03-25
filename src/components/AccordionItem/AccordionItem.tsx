import React, { Dispatch, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch } from "../../hooks/hooks";
import AccordionButtonIcon from "../../images/accordion-button-icon";
import EditIcon from "../../images/edit-icon";
import RemoveItemIcon from "../../images/remove-item-icon";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import "./AccordionItem.scss";
import { courseContentSlice } from "../../store/reducers/CourseContentSlice";

const AccordionItem = ({
  accordionItem,
  setIsPopupOpen,
}: {
  accordionItem: any;
  setIsPopupOpen: Dispatch<boolean>;
}) => {
  // const { name, answer } = accordionItem;
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useAppDispatch();
  const { setPopupInfo } = appSlice.actions;
  const { removeChapter } = courseContentSlice.actions;

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
            <p className="accordion-item__title">{accordionItem.name}</p>
            {EUserRole.LECTURER ? (
              <div className={"accordion-item__buttons"}>
                <EditIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    dispatch(
                      setPopupInfo({
                        type: EPopupType.CONTENT,
                        title: EPopupTitle.UPDATE_CHAPTER,
                        content: EPopupContentType.CHAPTER,
                      })
                    );
                    setIsPopupOpen(true);
                  }}
                />
                <RemoveItemIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    dispatch(removeChapter(accordionItem.id));
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
                dispatch(
                  setPopupInfo({
                    type: EPopupType.CONTENT,
                    title: EPopupTitle.CREATE_ARTICLE,
                    content: EPopupContentType.ARTICLE,
                  })
                );
                setIsPopupOpen(true);
              }}
            >
              Добавить статью
            </button>
          ) : null}
          <div>
            <Link to="#" className="answer">
              {"kkk"}
            </Link>
            {EUserRole.LECTURER ? (
              <div className={"accordion-item__buttons"}>
                <EditIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    dispatch(
                      setPopupInfo({
                        type: EPopupType.CONTENT,
                        title: EPopupTitle.UPDATE_ARTICLE,
                        requestType: EPopupRequestType.UPDATE_ARTICLE,
                        content: EPopupContentType.ARTICLE,
                      })
                    );
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
