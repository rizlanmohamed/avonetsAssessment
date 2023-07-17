import { Divider } from "antd";
import TableAtom, { TableAtomProps } from "../../atoms/tableAtom/TableAtom";
import SearchAndAdd, {
  SearchAndAddProps,
} from "../../molecules/searchAndAdd/SearchAndAdd";
import ModalAtom, { ModalAtomProps } from "../../atoms/modalAtom/ModalAtom";

type SearchableCRUDTableProps = TableAtomProps &
  SearchAndAddProps &
  ModalAtomProps;

const SearchableCRUDTable: React.FC<SearchableCRUDTableProps> = ({
  isModalPopUp,
  modalHeading,
  modalBody,
  modalOnOk,
  modalOnCancel,
  modalButtonName,
  modalImage,
  inputWidth,
  inputPlaceholder,
  inputValue,
  inputOnChange,
  inputIcon,
  buttonText,
  buttonType,
  buttonIcon,
  onButtonClick,
  isTableLoading,
  tableDataSource,
  tableColumns,
}) => {
  const propsForSearchAndAdd = {
    inputWidth,
    inputPlaceholder,
    inputValue,
    inputOnChange,
    inputIcon,
    onButtonClick,
    buttonText,
    buttonType,
    buttonIcon,
  };

  const propsForTable = {
    isTableLoading,
    tableDataSource,
    tableColumns,
  };

  const propsForModal = {
    isModalPopUp,
    modalHeading,
    modalBody,
    modalOnOk,
    modalOnCancel,
    modalButtonName,
    modalImage,
  };

  return (
    <>
      <ModalAtom {...propsForModal} />
      <SearchAndAdd {...propsForSearchAndAdd} />
      <Divider />
      <TableAtom {...propsForTable} />
    </>
  );
};

export default SearchableCRUDTable;
