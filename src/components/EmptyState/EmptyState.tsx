import EmptyStateIcon from "../../images/empty-state-icon";
import { IEmptyStateProps } from "../../interfaces/props/empty-state-props.interface";
import "./EmptyState.scss";

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  text,
  setIsPopupOpen,
}) => {
  // TODO: сделай динамическим
  const isLector = true;

  return (
    <div className="empty-state">
      <EmptyStateIcon className="empty-state__icon" />
      {setIsPopupOpen && (
        <div className="empty-state__wrapper">
          <p className="empty-state__text">{text}</p>
          {isLector ? (
            <p className="empty-state__text">
              {" "}
              Для редактирования содержания нажмите
              <button
                onClick={() => setIsPopupOpen(true)}
                className="empty-button empty-state__link"
              >
                здесь
              </button>
            </p>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
