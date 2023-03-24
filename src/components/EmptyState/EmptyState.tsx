import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/hooks";
import EmptyStateIcon from "../../images/empty-state-icon";
import { IEmptyStateProps } from "../../interfaces/props/empty-state-props.interface";
import "./EmptyState.scss";

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  text,
  setIsPopupOpen,
  setPopupRequestType,
}) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const isLector = user.role === EUserRole.LECTURER;

  return (
    <div className="empty-state">
      <EmptyStateIcon className="empty-state__icon" />
      {setIsPopupOpen && (
        <div className="empty-state__wrapper">
          <p className="empty-state__text">{text}</p>
          {isLector ? (
            <p className="empty-state__text">
              Для редактирования нажмите
              <button
                onClick={() => {
                  setPopupRequestType &&
                    setPopupRequestType(EPopupRequestType.CREATE_COURSE);
                  setIsPopupOpen(true);
                }}
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
