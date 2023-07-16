import ButtonAtom, { ButtonAtomProps } from "../../atoms/buttonAtom/ButtonAtom";
import InputAtom, { InputAtomProps } from "../../atoms/inputAtom/InputAtom";
import "./SearchAndAdd.scss";

export type SearchAndAddProps = ButtonAtomProps & InputAtomProps;

const SearchAndAdd: React.FC<SearchAndAddProps> = ({
  inputWidth,
  inputPlaceholder,
  inputIcon,
  buttonText,
  buttonType,
  buttonIcon,
  onButtonClick,
}) => {
  const inputProps = {
    inputWidth,
    inputPlaceholder,
    inputIcon
  };

  const buttonProps = {
    buttonText,
    buttonType,
    buttonIcon,
    onButtonClick
  };

  return (
    <div className="searchAndAddContainer">
      <InputAtom {...inputProps} />
      <ButtonAtom {...buttonProps} />
    </div>
  );
};

export default SearchAndAdd;
