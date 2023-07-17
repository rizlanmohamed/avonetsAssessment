import { Input } from "antd";
import { ReactNode } from "react";

export type InputAtomProps = {
  inputWidth?: string;
  inputPlaceholder: string;
  inputValue: any;
  inputOnChange: (e:any) => void;
  inputIcon?: ReactNode;
}

const InputAtom: React.FC<InputAtomProps> = ({ inputWidth, inputPlaceholder, inputIcon, inputValue, inputOnChange }) => {
  return (
    <Input
      style={{ width: inputWidth }}
      placeholder={inputPlaceholder}
      prefix={inputIcon}
      onChange={(e) => inputOnChange(e)}
      value={inputValue}
    />
  );
};

export default InputAtom;
