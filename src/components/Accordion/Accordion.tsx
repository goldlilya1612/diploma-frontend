import { faqs } from './data';
import './Accordion.css';
import AccordionItem from '../AccordionItem/AccordionItem';

const Accordion = () => {
  return (
    <ul className="accordion">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} faq={faq} />
      ))}
    </ul>
  );
};

export default Accordion;
