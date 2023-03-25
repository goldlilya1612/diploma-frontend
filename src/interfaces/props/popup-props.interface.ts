import { Dispatch } from "react";
import { ICourseCardProps } from "./course-card.interface";

export interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: { name: string; code: number };
  isUpdatedData?: boolean;
  setIsUpdatedData?: Dispatch<boolean>;
  popupInfoData?: any;
  currentOpenCourse?: ICourseCardProps;
}
