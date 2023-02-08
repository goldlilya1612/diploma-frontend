import { ReactComponent as EmptyStateIcon } from "../../images/empty-state-icon.svg";
import { IEmptyStateProps } from "../../interfaces/props/empty-state-props.interface";
import "./EmptyState.scss";

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  text,
  setIsPopupOpen,
}) => {
  return (
    <div className="empty-state">
      <EmptyStateIcon className="empty-state__icon" />
      {setIsPopupOpen && (
        <p className="empty-state__text">
          Упс... Курс пустой. Для редактирования содержания нажмите
          <button
            onClick={() => setIsPopupOpen(true)}
            className="empty-button empty-state__link"
          >
            {" "}
            здесь
          </button>
        </p>
      )}
    </div>
  );
};

export default EmptyState;
