import { Table } from "antd";

export type TableAtomProps = {
    tableDataSource: any[],
    tableColumns: any[]
}

const TableAtom: React.FC <TableAtomProps> = ({tableDataSource, tableColumns}) => {
  return (
    <Table dataSource={tableDataSource} columns={tableColumns} />
  )
}

export default TableAtom