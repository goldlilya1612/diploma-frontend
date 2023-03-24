import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupTitle } from "../popup-info.interface";

export interface IEmptyStateProps {
  text: string;
  setIsPopupOpen: (value: boolean) => void;
  content: EPopupContentType;
  title: EPopupTitle;
}
