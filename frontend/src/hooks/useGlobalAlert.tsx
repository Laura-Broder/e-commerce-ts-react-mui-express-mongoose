import { useContext } from "react";
import { AlertSeverityEnum } from "../utils/types";
import { appContext } from "./context";

export enum GlobalAlertTypesEnum {
  GENERAL_SERVER_ERROR = "general_server_error",
  LOGIN_SUCCESS = "login_success",
}

export type GlobalAlertType = {
  [key in GlobalAlertTypesEnum]: {
    type: AlertSeverityEnum;
    title: string;
    content?: string;
  };
};
const ALERT: GlobalAlertType = {
  [GlobalAlertTypesEnum.GENERAL_SERVER_ERROR]: {
    type: AlertSeverityEnum.ERROR,
    title: "Something Went Wrong...",
    content: "Try again later",
  },
  [GlobalAlertTypesEnum.LOGIN_SUCCESS]: {
    type: AlertSeverityEnum.SUCCESS,
    title: "Welcome!",
    content: "You will be redirected shortly",
  },
};

const useGlobalAlert = () => {
  const { setGlobalAlert, removeGlobalAlert, globalAlert } =
    useContext(appContext);

  const showAlertByType = (
    alertType: GlobalAlertTypesEnum,
    clearDelay?: number | undefined,
    afterCloseCallback?: any
  ) => {
    setGlobalAlert({ ...ALERT[alertType], show: true });
    if (clearDelay)
      setTimeout(() => {
        removeGlobalAlert();
        if (afterCloseCallback) afterCloseCallback();
      }, clearDelay);
  };

  return { showAlertByType, removeGlobalAlert, setGlobalAlert, globalAlert };
};

export default useGlobalAlert;
