import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.scss";
import { faqs } from "./data";

const Accordion = ({
  setIsPopupOpen,
  setPopupRequestType,
}: {
  setIsPopupOpen: Dispatch<boolean>;
  setPopupRequestType: Dispatch<EPopupRequestType>;
}) => {
  return (
    <div className="accordion__wrapper">
      <button
        className="accordion__button"
        onClick={() => {
          setPopupRequestType(EPopupRequestType.ADD_CHAPTER);
          setIsPopupOpen(true);
        }}
      >
        Добавить раздел
      </button>
      <ul className="accordion">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} />
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
