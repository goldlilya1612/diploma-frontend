const AccordionButtonIcon = ({ isClicked }: { isClicked: boolean }) => (
  <svg
    width="11"
    height="20"
    viewBox="0 0 11 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isClicked ? "rotate(90deg)" : "rotate(0deg)" }}
  >
    <path
      d="M1.5448 18.4403L9.76407 10.1837L1.5448 1.92713"
      stroke={`${isClicked ? "white" : "#4A3AFF"}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AccordionButtonIcon;
