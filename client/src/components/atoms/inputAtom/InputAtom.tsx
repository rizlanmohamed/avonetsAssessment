import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

export type InputAtomProps = {
  inputWidth?: string;
  inputPlaceholder: string;
  inputIcon?: ReactNode;
}

const InputAtom: React.FC<InputAtomProps> = ({ inputWidth, inputPlaceholder, inputIcon }) => {
  return (
    <Input
      style={{ width: inputWidth }}
      placeholder={inputPlaceholder}
      prefix={inputIcon}
    />
  );
};

export default InputAtom;
