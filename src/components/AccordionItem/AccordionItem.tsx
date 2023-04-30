import React, { Dispatch, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { info } from "sass";
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
import {
  deleteArticle,
  deleteChapter,
  deleteCourse,
} from "../../utils/mainApi";

const AccordionItem = ({
  accordionItem,
  setIsPopupOpen,
  isUpdatedChapterArray,
  setIsUpdatedChapterArray,
}: {
  accordionItem: any;
  isUpdatedChapterArray: boolean;
  setIsUpdatedChapterArray: Dispatch<boolean>;
  setIsPopupOpen: Dispatch<boolean>;
}) => {
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useAppDispatch();
  const { setPopupInfo, setIsLoading } = appSlice.actions;
  const articles = accordionItem.Articles;

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
                        info: accordionItem,
                      })
                    );
                    setIsPopupOpen(true);
                  }}
                />
                <RemoveItemIcon
                  className="accordion-item__icons"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    dispatch(setIsLoading(true));
                    deleteChapter(
                      accordionItem.id,
                      localStorage.getItem("token")
                    )
                      .then(() => {
                        setIsUpdatedChapterArray &&
                          setIsUpdatedChapterArray(!isUpdatedChapterArray);
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
                    info: { chapterID: accordionItem.id },
                    requestType: EPopupRequestType.CREATE_ARTICLE,
                  })
                );
                setIsPopupOpen(true);
              }}
            >
              Добавить статью
            </button>
          ) : null}
          <div className={"links-wrapper"}>
            {articles.length > 0 &&
              articles.map((article: any) => (
                <div key={Math.random()}>
                  <Link to="#" className="answer">
                    {article.name}
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
                              info: article,
                            })
                          );
                          setIsPopupOpen(true);
                        }}
                      />
                      <RemoveItemIcon
                        className="accordion-item__icons"
                        onClick={(e: React.SyntheticEvent) => {
                          e.stopPropagation();
                          e.preventDefault();
                          dispatch(setIsLoading(true));
                          deleteArticle(
                            article.id,
                            localStorage.getItem("token")
                          )
                            .then(() => {
                              setIsUpdatedChapterArray &&
                                setIsUpdatedChapterArray(
                                  !isUpdatedChapterArray
                                );
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
              ))}
          </div>
        </div>
      </button>
    </li>
  );
};
export default AccordionItem;
