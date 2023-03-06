import { useRef, useState } from "react";
import "./AccordionItem.scss";
import AccordionButtonIcon from "../../images/accordion-button-icon";

const AccordionItem = ({ faq }: { faq: any }) => {
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
          <p className="accordion-item__title">{question}</p>
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
          <div className="answer">{answer}</div>
        </div>
      </button>
    </li>
  );
};

export default AccordionItem;
