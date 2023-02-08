import { useRef, useState } from "react";
import "./AccordionItem.scss";

const AccordionItem = ({ faq }: { faq: any }) => {
  const { question, answer } = faq;

  const [clicked, setClicked] = useState(false);
  const contentEl = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className="accordion_item">
      <button className="button" onClick={handleToggle}>
        {question}
        {clicked ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.34317 7.75735L4.92896 9.17156L12 16.2427L19.0711 9.17159L17.6569 7.75738L12 13.4142L6.34317 7.75735Z"
              fill="#A1A1A1"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
              fill="#414141"
            />
          </svg>
        )}
      </button>
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
    </li>
  );
};

export default AccordionItem;
