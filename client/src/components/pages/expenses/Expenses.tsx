import { Row, Col, Input, Select, InputNumber, Form, DatePicker } from "antd";
import SearchableCRUDTable from "../../templetes/searchableCRUDTable/SearchableCRUDTable";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import React, { ReactNode, useState } from "react";
import ExpenseForm from "../../molecules/expenseForm/ExpenseForm";
import TableActionButton from "../../molecules/tableActionButton/TableActionButton";

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
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "dateOfTheExpense",
      key: "date",
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

  const tableDataSource = [
    {
      key: "1",
      expense: "Chocolate Ice cream 5L",
      category: "Food",
      amount: 302,
      dateOfTheExpense: "29/07/2023",
      paymentMethod: "Cash",
    },
    {
      key: "2",
      expense: "Laptop Skin",
      category: "Online",
      amount: 892,
      dateOfTheExpense: "29/07/2023",
      paymentMethod: "Online",
    },
  ];

  const onFinish = (values: any, type: any) => {
    //console.log("Form values", values);
    console.log(values, type);
    if (type === "Edit") {
    } else {
      console.log("Customer create works");
    }
  };

  const modalForm = () => {
    return (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values: any) => onFinish(values, modal.modalType)}
      >
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
          rules={[{ required: true, message: "Amount is required" }]}
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

  const handleModalOnOk = () => {
    form.submit();
  };

  const handleTableView = (record: any) => {};

  const handleTableEdit = (record: any) => {
    form.setFieldsValue(record);
    setModal({
      isModalPopUp: true,
      modalType: "update",
      modalBody: modalForm(),
    });
  };

  const handleTableDelete = (record: any) => {};

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

  const handleModalNaming = (
    actionType: "create" | "update" | "view" | null,
    extraName: string
  ) => {
    return actionType
      ? actionType.charAt(0).toUpperCase() + actionType.slice(1) + extraName
      : "Loading";
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
          inputPlaceholder="Search expenses"
          inputIcon={<SearchOutlined />}
          buttonText="Add Expense"
          buttonType="icon-text"
          buttonIcon={<PlusOutlined />}
          onButtonClick={handleAddButton}
          tableColumns={tableColumns}
          tableDataSource={tableDataSource}
        />
      </Col>
    </Row>
  );
};

export default Expenses;
