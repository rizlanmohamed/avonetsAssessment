import { Form, Input, Select, DatePicker, InputNumber } from "antd";
import React, { useEffect } from "react";
import type { FormInstance } from "antd/es/form";

const ExpenseForm: React.FC<any> = ({ formItems, onFinish  }) => {
  const formRef = React.useRef<FormInstance>(null);

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...formItems });
  }, [formItems]);

  const { TextArea } = Input;

  // const handleFinish = (values: any) => {
  //   console.log('CHILD')
  //   onSubmit(values);
  //   formRef.current?.submit
  // };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      ref={formRef}
      onFinish={onFinish}
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

export default ExpenseForm;
