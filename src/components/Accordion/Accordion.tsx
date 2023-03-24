import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.scss";
import { faqs } from "./data";

const Accordion = ({
  setIsPopupOpen,
  setPopupRequestType,
  setPopupTitle,
}: {
  setIsPopupOpen: Dispatch<boolean>;
  setPopupRequestType: Dispatch<EPopupRequestType>;
  setPopupTitle: Dispatch<string>;
}) => {
  return (
    <div className="accordion__wrapper">
      {EUserRole.LECTURER ? (
        <button
          className="accordion__button"
          onClick={() => {
            setPopupRequestType(EPopupRequestType.ADD_CHAPTER);
            setPopupTitle("Форма добавления раздела");
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
            setPopupTitle={setPopupTitle}
            setPopupRequestType={setPopupRequestType}
          />
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
