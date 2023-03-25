import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.scss";

const Accordion = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: Dispatch<boolean>;
}) => {
  const dispatch = useAppDispatch();
  const { setPopupInfo } = appSlice.actions;
  const { content } = useAppSelector(
    (state) => state.courseContentReducer.courseContent
  );
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
              })
            );
            setIsPopupOpen(true);
          }}
        >
          Добавить раздел
        </button>
      ) : null}
      <ul className="accordion">
        {content.map((accordionItem: any, index: any) => (
          <AccordionItem
            key={index}
            accordionItem={accordionItem}
            setIsPopupOpen={setIsPopupOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
