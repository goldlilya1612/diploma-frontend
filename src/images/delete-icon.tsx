const DeleteIcon: React.FC<any> = ({
  className,
  onClick,
}: {
  className: string;
  onClick: any;
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
  >
    <path
      d="M8 12H16"
      stroke="#8b8b8b"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default DeleteIcon;
