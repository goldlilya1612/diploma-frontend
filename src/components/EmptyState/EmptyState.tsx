import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { EUserRole } from "../../enums/user-role.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import EmptyStateIcon from "../../images/empty-state-icon";
import { EPopupTitle } from "../../interfaces/popup-info.interface";
import { IEmptyStateProps } from "../../interfaces/props/empty-state-props.interface";
import { appSlice } from "../../store/reducers/AppSlice";
import "./EmptyState.scss";

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  text,
  setIsPopupOpen,
  content,
  title,
}) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const isLector = user.role === EUserRole.LECTURER;
  const dispatch = useAppDispatch();
  const { setPopupInfo } = appSlice.actions;

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
                  dispatch(
                    setPopupInfo({
                      type: EPopupType.CONTENT,
                      title: title,
                      requestType: EPopupRequestType.CREATE_COURSE,
                      content: content,
                    })
                  );
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
