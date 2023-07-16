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
  inputIcon,
  buttonText,
  buttonType,
  buttonIcon,
  onButtonClick,
  tableDataSource,
  tableColumns,
}) => {
  const propsForSearchAndAdd = {
    inputWidth,
    inputPlaceholder,
    inputIcon,
    onButtonClick,
    buttonText,
    buttonType,
    buttonIcon,
  };

  const propsForTable = {
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
