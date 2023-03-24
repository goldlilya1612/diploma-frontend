import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";
import { IPopupInfo } from "../popup-info.interface";

export interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: { name: string; code: number };
  isUpdatedData?: boolean;
  setIsUpdatedData?: Dispatch<boolean>;
  popupInfoData?: any;
}
