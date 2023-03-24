import { EPopupRequestType } from "../enums/popup-content-request-type.enum";
import { EPopupContentType } from "../enums/popup-content-type.enum";
import { EPopupType } from "../enums/popup-type.enum";

export enum EPopupTitle {
  CREATE_COURSE = "Форма добавления курса",
  UPDATE_COURSE = "Форма редактирования курса",
  CREATE_CHAPTER = "Форма создания раздела",
  UPDATE_CHAPTER = "Форма редактирования раздела",
  CREATE_ARTICLE = "Форма добавления статьи",
  UPDATE_ARTICLE = "Форма редактирования статьи",
}

export interface IPopupInfo {
  type: EPopupType;
  title?: EPopupTitle;
  requestType?: EPopupRequestType;
  content?: EPopupContentType;
  errorMessage?: {
    code: number;
    name: string;
  };
}
