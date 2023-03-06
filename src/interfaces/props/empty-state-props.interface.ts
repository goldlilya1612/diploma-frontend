import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";

export interface IEmptyStateProps {
  text: string;
  setIsPopupOpen: (value: boolean) => void;
  setPopupRequestType?: Dispatch<EPopupRequestType>;
}
