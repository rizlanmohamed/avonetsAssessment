import { Button } from "antd";
import { ReactNode } from "react";

export type ButtonAtomProps = {
  buttonText?: string;
  buttonType: "icon-text" | "icon" | "text";
  buttonIcon?: ReactNode;
  onButtonClick: () => void;
};

const ButtonAtom: React.FC<ButtonAtomProps> = ({
  buttonText,
  buttonType,
  buttonIcon,
  onButtonClick
}) => {
  return (
    <Button
    onClick={onButtonClick}
    >
      {buttonType === "text"
        ? buttonText
        : buttonType === "icon"
        ? buttonIcon
        : buttonType === "icon-text"
        ? (
            <>
              {buttonIcon}
              {" "}
              {buttonText}
            </>
          )
        : null}
    </Button>
  );
};

export default ButtonAtom;
