import { Col, Row, Card, Statistic, Divider, Alert } from "antd";
import {
  balanceSummaryService,
  pieChartService,
} from "../../../services/services";
import DemoPie from "./visualization/pieChart/PieChart";
import { useEffect, useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const Dashboard: React.FC = () => {
  const [pieData, setPieData] = useState([]);
  const [balanceSummary, setBalanceSummary] = useState<any>({});

  useEffect(() => {
    pieChartService()
      .then((res) => setPieData(res.data))
      .catch((err) => console.log(err));

    balanceSummaryService()
      .then((res) => setBalanceSummary(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Row gutter={30}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Balance"
              value={
                balanceSummary.balance ? balanceSummary.balance : "Loading..."
              }
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="LKR"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Spend"
              value={
                balanceSummary.spend ? balanceSummary.spend : "Loading ..."
              }
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="LKR"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Balance Personage"
              value={
                balanceSummary.balancePercentage
                  ? balanceSummary.balancePercentage
                  : "Loading ..."
              }
              precision={2}
              valueStyle={
                balanceSummary.balancePercentage >= 10
                  ? { color: "#3f8600" }
                  : { color: "#cf1322" }
              }
              prefix={
                balanceSummary.balancePercentage >= 10 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={18} offset={3}>
          <DemoPie data={pieData} />
          {balanceSummary.balancePercentage <= 10 && <Alert message="Warning: A percentage of less than 10% is only available " type="warning" showIcon closable />}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
