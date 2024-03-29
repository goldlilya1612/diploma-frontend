import React from "react";

const EditIcon = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: (e: React.SyntheticEvent) => void;
}) => {
  return (
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
        d="M21.81 3.94C20.27 7.78 16.41 13 13.18 15.59L11.21 17.17C10.96 17.35 10.71 17.51 10.43 17.62C10.43 17.44 10.42 17.24 10.39 17.05C10.28 16.21 9.90002 15.43 9.23002 14.76C8.55002 14.08 7.72002 13.68 6.87002 13.57C6.67002 13.56 6.47002 13.54 6.27002 13.56C6.38002 13.25 6.55002 12.96 6.76002 12.72L8.32002 10.75C10.9 7.52 16.14 3.64 19.97 2.11C20.56 1.89 21.13 2.05 21.49 2.42C21.87 2.79 22.05 3.36 21.81 3.94Z"
        stroke="#3A3A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.43 17.62C10.43 18.72 10.01 19.77 9.22003 20.57C8.61003 21.18 7.78003 21.6 6.79003 21.73L4.33003 22C2.99003 22.15 1.84003 21.01 2.00003 19.65L2.27003 17.19C2.51003 15 4.34003 13.6 6.28003 13.56C6.48003 13.55 6.69003 13.56 6.88003 13.57C7.73003 13.68 8.56003 14.07 9.24003 14.76C9.91003 15.43 10.29 16.21 10.4 17.05C10.41 17.24 10.43 17.43 10.43 17.62Z"
        stroke="#3A3A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.24 14.47C14.24 11.86 12.12 9.74 9.51001 9.74"
        stroke="#3A3A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
