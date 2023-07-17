import { Table } from "antd";

export type TableAtomProps = {
    isTableLoading: boolean,
    tableDataSource: any[],
    tableColumns: any[]
}

const TableAtom: React.FC <TableAtomProps> = ({tableDataSource, tableColumns, isTableLoading}) => {
  return (
    <Table loading={isTableLoading} dataSource={tableDataSource} columns={tableColumns} />
  )
}

export default TableAtom