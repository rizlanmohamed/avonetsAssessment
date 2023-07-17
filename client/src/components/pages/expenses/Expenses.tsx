import { Row, Col, Input, Select, InputNumber, Form, DatePicker } from "antd";
import SearchableCRUDTable from "../../templetes/searchableCRUDTable/SearchableCRUDTable";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import React, { ReactNode, useState, useEffect } from "react";
import TableActionButton from "../../molecules/tableActionButton/TableActionButton";
import { useAppSelector } from "../../../redux/store";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
  searchExpense
} from "../../../redux/expensesSlice/expensesSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import dayjs from "dayjs";
import useDebounce from "../../../hooks/useDebounce";

const SvgImage: string =
  require("../../../assets/images/svg/expenseArt.svg").default;

type ModalState = {
  isModalPopUp: boolean;
  modalType: null | "create" | "update" | "view";
  modalBody?: ReactNode;
};

const Expenses: React.FC = () => {
  const [modal, setModal] = useState<ModalState>({
    isModalPopUp: false,
    modalType: "create",
  });

const [searchKeyword, setSearchKeyword] = useState();

  const dispatch = useDispatch<Dispatch<any>>();

  const data = useAppSelector((state) => state.expenses.data);
  const loading = useAppSelector((state) => state.expenses.loading);
  const error = useAppSelector((state) => state.expenses.error);

  console.log(error)
  const debouncedKeyword = useDebounce(searchKeyword, 500);

  useEffect(() => {
    if (debouncedKeyword) {
      dispatch(searchExpense(debouncedKeyword));
    } else{
      dispatch(getExpenses());
    }
  }, [debouncedKeyword, dispatch]);

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const tableColumns = [
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",filters: [
        {
          text: 'Food',
          value: 'Food',
        },
        {
          text: 'Movies',
          value: 'Movies',
        },
        {
          text: 'Online Subscriptions',
          value: 'OnlineSubscriptions',
        },
        {
          text: 'Traveling',
          value: 'Traveling',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string, record:any) => record.category.startsWith(value),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a:any, b:any) => parseInt(a.date.split("-").join()) - parseInt(b.date.split("-").join()),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: any) => {
        return (
          <>
            <TableActionButton
              actionView={() => handleTableView(record)}
              actionEdit={() => handleTableEdit(record)}
              invokeDelete={() => {}}
              actionDelete={() => handleTableDelete(record)}
            />
          </>
        );
      },
    },
  ];

  const onFinish = (values: any) => {
    const formattedDate = {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
    };
    let modalType = values._id ? "update" : "create";

    if (modalType === "update") {
      dispatch(updateExpense(formattedDate));
      handleModalOnCancel();
    } else if (modalType === "create") {
      dispatch(createExpense(formattedDate));
      handleModalOnCancel();
    } else {
      console.log('Yes this view')
      handleModalOnCancel();
    }
  };

  const modalForm = (readOnly: boolean = false) => {
    return (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values: any) => onFinish(values)}
        disabled={readOnly}
      >
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Expense"
          name="expense"
          rules={[{ required: true, message: "Expense name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select>
            <Select.Option value="">Select</Select.Option>
            <Select.Option value="Foods">Foods</Select.Option>
            <Select.Option value="Movies">Movies</Select.Option>
            <Select.Option value="OnlineSubscriptions">
              Online Subscriptions
            </Select.Option>
            <Select.Option value="Traveling">Traveling</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Amount is required" }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Date select is required" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[
            { required: true, message: "Please select the payment method" },
          ]}
        >
          <Select>
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="DebitCard">Debit Card</Select.Option>
            <Select.Option value="CreditCard">Credit Card</Select.Option>
            <Select.Option value="Online">Online</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Note" name="note">
          <TextArea />
        </Form.Item>
      </Form>
    );
  };

  const handleTableView = (record: any) => {
    form.setFieldsValue({ ...record, date: dayjs(record.date) });
    setModal({
      isModalPopUp: true,
      modalType: "view",
      modalBody: modalForm(true),
    });
  };

  const handleTableEdit = (record: any) => {
    form.setFieldsValue({ ...record, date: dayjs(record.date) });
    setModal({
      isModalPopUp: true,
      modalType: "update",
      modalBody: modalForm(),
    });
  };

  const handleTableDelete = (record: any) => {
    dispatch(deleteExpense(record._id));
  };

  const handleAddButton = () => {
    setModal({
      isModalPopUp: true,
      modalType: "create",
      modalBody: modalForm(),
    });
  };

  const handleModalOnCancel = () => {
    form.resetFields();
    setModal({
      isModalPopUp: false,
      modalType: null,
      modalBody: null,
    });
  };

  const handleModalOnOk = () => {
    form.submit();
  };

  const handleModalNaming = (
    actionType: "create" | "update" | "view" | null,
    extraName: string
  ) => {
    return actionType
      ? actionType.charAt(0).toUpperCase() + actionType.slice(1) + extraName
      : "Loading";
  };

  const handleSearch = (e: any) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  return (
    <Row>
      <Col span={22} offset={1}>
        <SearchableCRUDTable
          isModalPopUp={modal.isModalPopUp}
          modalHeading={handleModalNaming(modal.modalType, " Expense")}
          modalBody={modal.modalBody}
          modalOnOk={handleModalOnOk}
          modalOnCancel={handleModalOnCancel}
          modalButtonName={handleModalNaming(modal.modalType, " Expense")}
          modalImage={SvgImage}
          inputWidth="60vw"
          inputPlaceholder="Advance Search by expense, category, and payment method"
          inputValue={searchKeyword}
          inputOnChange={(e) => handleSearch(e)}
          inputIcon={<SearchOutlined />}
          buttonText="Add Expense"
          buttonType="icon-text"
          buttonIcon={<PlusOutlined />}
          onButtonClick={handleAddButton}
          isTableLoading={loading}
          tableColumns={tableColumns}
          tableDataSource={data.length >= 1 ? data : []}
        />
      </Col>
    </Row>
  );
};

export default Expenses;
