import { Dispatch } from "react";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch } from "../../hooks/hooks";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.scss";
import { faqs } from "./data";

const Accordion = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: Dispatch<boolean>;
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
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            setIsPopupOpen={setIsPopupOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
