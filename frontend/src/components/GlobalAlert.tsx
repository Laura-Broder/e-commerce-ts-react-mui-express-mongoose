import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useCallback, useEffect } from "react";
import { AlertSeverityEnum, IGlobalAlert } from "../utils/types";

interface Props extends IGlobalAlert {
  onClose: VoidFunction;
}

const GlobalAlert = ({
  type = AlertSeverityEnum.SUCCESS,
  title,
  content,
  show = false,
  onClose = () => {},
}: Props) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const closeAlertTimer = setTimeout(() => {
      handleClose();
    }, 3000);
    return () => clearTimeout(closeAlertTimer);
  }, [handleClose]);

  if (show) {
    return (
      <Alert severity={type} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {content ?? null}
      </Alert>
    );
  } else return null;
};

export default GlobalAlert;
