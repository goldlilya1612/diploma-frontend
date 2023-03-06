import { Dispatch } from "react";
import { EPopupRequestType } from "../../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../../enums/popup-content-type.enum";
import { EPopupType } from "../../enums/popup-type.enum";

export interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: { name: string; code: number };
  title?: string;
  popupType: EPopupType;
  contentType?: EPopupContentType;
  isUpdatedData?: boolean;
  setIsUpdatedData?: Dispatch<boolean>;
  popupInfoData?: any;
  popupRequestType?: EPopupRequestType;
}
