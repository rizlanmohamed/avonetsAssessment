import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, message, Popconfirm } from "antd";

export type TableActionButtonProps = {
  actionView: () => void;
  actionEdit: () => void;
  invokeDelete: () => void;
  actionDelete: () => void;
}

const TableActionButton: React.FC<TableActionButtonProps> = ({
  actionView,
  actionEdit,
  invokeDelete,
  actionDelete,
}) => {
  const cancel = () => {
    message.error("Delete operation cancelled");
  };

  const confirm = () => {
    console.log('button pressed')
    actionDelete()
  };

  return (
    <>
      <Space>
        <Button type="default" icon={<EyeOutlined />} onClick={actionView}>
          View
        </Button>
        <Button type="default" icon={<EditOutlined />} onClick={actionEdit}>
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="default"
            icon={<DeleteOutlined />}
            onClick={invokeDelete}
            danger
          >
            Delete
          </Button>
        </Popconfirm>
      </Space>
    </>
  );
};

export default TableActionButton;
