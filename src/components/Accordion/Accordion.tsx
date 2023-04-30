import { Dispatch, useEffect } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import { getCourse } from "../../utils/mainApi";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.scss";

const Accordion = ({
  setIsPopupOpen,
  content,
  isUpdatedChapterArray,
  setIsUpdatedChapterArray,
}: {
  setIsPopupOpen: Dispatch<boolean>;
  content: any;
  isUpdatedChapterArray: boolean;
  setIsUpdatedChapterArray: Dispatch<boolean>;
}) => {
  const dispatch = useAppDispatch();
  const { setPopupInfo } = appSlice.actions;

  return (
    <div className="accordion__wrapper">
      {EUserRole.LECTURER ? (
        <button
          className="accordion__button"
          onClick={() => {
            dispatch(
              setPopupInfo({
                type: EPopupType.CONTENT,
                title: EPopupTitle.CREATE_CHAPTER,
                requestType: EPopupRequestType.CREATE_CHAPTER,
                content: EPopupContentType.CHAPTER,
                info: null,
              })
            );
            setIsPopupOpen(true);
          }}
        >
          Добавить раздел
        </button>
      ) : null}
      <ul className="accordion">
        {content &&
          content.map((accordionItem: any, index: any) => (
            <AccordionItem
              key={index}
              accordionItem={accordionItem}
              isUpdatedChapterArray={isUpdatedChapterArray}
              setIsUpdatedChapterArray={setIsUpdatedChapterArray}
              setIsPopupOpen={setIsPopupOpen}
            />
          ))}
      </ul>
    </div>
  );
};

export default Accordion;
