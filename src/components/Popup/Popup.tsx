import React from "react";
import "./Popup.css";
import { ReactComponent as ConflictErrorIcon } from "../../images/409-error-icon.svg";
import { ReactComponent as IncorrectErrorIcon } from "../../images/401-error-icon.svg";
import { EErrorCode } from "../../enums/error-code.enum";

function Popup({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: any;
  message: { name: string; code: number };
}) {
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
      <div className={`popup__container`}>
        <button
          type="button"
          className={`popup__close-button`}
          onClick={onClose}
        ></button>
        <p className="popup__text">{message.name}</p>
        {renderPopupImage(message)}
      </div>
    </div>
  );
}

export default Popup;
