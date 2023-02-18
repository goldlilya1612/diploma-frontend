import { Reorder } from "framer-motion";
import React, { useState } from "react";
import "./Popup.scss";
import { ReactComponent as ConflictErrorIcon } from "../../images/409-error-icon.svg";
import { ReactComponent as IncorrectErrorIcon } from "../../images/401-error-icon.svg";
import { EErrorCode } from "../../enums/error-code.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import CoursesChapter from "../CoursesChapter/CoursesChapter";

function Popup({
  isOpen,
  onClose,
  message,
  title,
  popupType,
}: {
  isOpen: boolean;
  onClose: any;
  message?: { name: string; code: number };
  title?: string;
  popupType: EPopupType;
}) {
  const [courseСhapters, setCourseСhapters] = useState([''] as any)

  const renderPopupContent = (popupType: EPopupType) => {
    switch (popupType) {
      case EPopupType.ERROR:
        return (
          <>
            <p className="popup__text">{message?.name}</p>
            {message && renderPopupImage(message)}
          </>
        );
      case EPopupType.CONTENT:
        return <>
          <h2 className="popup__text">Содержание</h2>
          <Reorder.Group
              as="ol"
              axis="y"
              values={courseСhapters}
              onReorder={setCourseСhapters}
              style={{
                listStyleType: "none",
                paddingLeft: "0px",
                margin: "0px",
                width: '100%',
                overflow: 'auto'
              }}
          >
            {courseСhapters.map((chapter: any) => (
                <CoursesChapter
                    chapter={chapter}
                    courseСhapters={courseСhapters}
                    setCoursesСhapter={setCourseСhapters}
                />
            ))}
          </Reorder.Group>
        </>
    }
  };

  const renderPopupImage = ({ code }: { code: number }) => {
    switch (code) {
      case EErrorCode.ERROR_409: {
        return <ConflictErrorIcon className={`popup__image`} />;
      }
      case EErrorCode.ERROR_401 || EErrorCode.ERROR_400: {
        return <IncorrectErrorIcon className={`popup__image`} />;
      }
    }
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div
        className={`popup__container ${
          popupType === EPopupType.ERROR ? "popup__container_error" : "popup__container_content"
        }`}
      >
        <button
          type="button"
          className={`popup__close-button`}
          onClick={onClose}
        ></button>
        {renderPopupContent(popupType)}
      </div>
    </div>
  );
}

export default Popup;
