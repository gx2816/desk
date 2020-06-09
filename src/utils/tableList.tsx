import { Tooltip } from "antd";
import React from "react";

export const incomeColumns = [
  {
    title: '日期',
    dataIndex: 'datetime',
    key:"datetime",
    width: "30%",
  },
  {
    title: '当日订单收入',
    dataIndex: `order_income`,
    key: "order_income",
    render: (val: any) => <span>{(val / 100).toLocaleString()}</span>
  },
  {
    title: '当日新增用户',
    dataIndex: 'added_users',
    key: "added_users",
  },
  {
    title: '当日订单数',
    dataIndex: 'order_count',
    key:"order_count",
  },
];


