import { Dispatch } from "react";
import { faqs } from "./data";
import "./Accordion.scss";
import AccordionItem from "../AccordionItem/AccordionItem";

const Accordion = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: Dispatch<boolean>;
}) => {
  return (
    <div className="accordion__wrapper">
      <button
        className="accordion__button"
        onClick={() => setIsPopupOpen(true)}
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
