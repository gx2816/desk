import { Tooltip } from "antd";
import React from "react";

export const orderColumns = [
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
    width: 130,
    fixed: "left"
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="第一次启动该应用的用户">
          新增用户
        </Tooltip>
      );
    },
    dataIndex: "added_users",
    key: "added_users",
    width: 100
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="新增用户当天支付电子单总数">
          日新增已付电子照单
        </Tooltip>
      );
    },
    dataIndex: "added_paid_orders",
    key: "added_paid_orders",
    width: 150
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="当天归属新增用户支付的订单金额总和">
          日新增用户收入
        </Tooltip>
      );
    },
    dataIndex: "added_income",
    key: "added_income",
    width: 130,
    render: (val: any) => <span>{val / 100}</span>
  },
  {
    title: () => {
      return (
        <Tooltip
          placement="top"
          title="当天新增用户下的订单的支付转化率，新增已支付订单数/新增总订单数"
        >
          日新增订单转化
        </Tooltip>
      );
    },
    dataIndex: "added_order_rate",
    key: "added_order_rate",
    width: 130,
    render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
  },
  {
    title: "日新增用户转化",
    children: [
      {
        title: () => {
          return (
            <Tooltip
              placement="top"
              title="当天新增用户中，下单的新增用户数占总新增用户的占比"
            >
              下单
            </Tooltip>
          );
        },
        dataIndex: "added_user_order_rate",
        key: "added_user_order_rate",
        width: 100,
        render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
      },
      {
        title: () => {
          return (
            <Tooltip
              placement="top"
              title="当天新增用户中，有付费的新增用户数占总新增用户的占比"
            >
              付费
            </Tooltip>
          );
        },
        dataIndex: "added_user_paid_rate",
        key: "added_user_paid_rate",
        width: 100,
        render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
      }
    ]
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="当天打开应用的独立用户数">
          活跃用户
        </Tooltip>
      );
    },
    dataIndex: "active_users",
    key: "active_users",
    width: 100
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="活跃用户当天支付单数">
          日活跃已付电子照单
        </Tooltip>
      );
    },
    dataIndex: "active_paid_orders",
    key: "active_paid_orders",
    width: 150
  },
  {
    title: "冲印订单",
    dataIndex: "print_order",
    key: "print_order",
    width: 100
  },
  {
    title: () => {
      return (
        <Tooltip placement="top" title="当天归属活跃用户支付的订单金额总和">
          日活跃用户收入
        </Tooltip>
      );
    },
    dataIndex: "active_income",
    key: "active_income",
    width: 130,
    render: (val: any) => <span>{val / 100}</span>
  },
  {
    title: () => {
      return (
        <Tooltip
          placement="top"
          title="当天活跃用户下的订单的支付转化率，活跃已支付订单数/活跃总订单数"
        >
          日活跃订单转化
        </Tooltip>
      );
    },
    dataIndex: "active_order_rate",
    key: "active_order_rate",
    render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>,
    width: 130
  },
  {
    title: () => {
      return (
        <Tooltip
          placement="top"
          title="当天活跃用户中，下单的活跃用户数占总活跃用户的占比"
        >
          日活跃用户转化
        </Tooltip>
      );
    },
    // filterDropdown: true,
    // filterIcon: () => {
    //   return (
    //     <Tooltip placement="topRight">
    //         <Icon type="question-circle" theme="twoTone" />
    //     </Tooltip>
    //   )
    // },
    children: [
      {
        title: () => {
          return (
            <Tooltip
              placement="top"
              title="当天活跃用户中，下单的活跃用户数占总活跃用户的占比"
            >
              下单
            </Tooltip>
          );
        },
        dataIndex: "active_user_order_rate",
        key: "active_user_order_rate",
        render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>,
        width: 130
      },
      {
        title: () => {
          return (
            <Tooltip
              placement="top"
              title="当天活跃用户中，有付费的活跃用户数占总活跃用户的占比"
            >
              付费
            </Tooltip>
          );
        },
        dataIndex: "active_user_paid_rate",
        key: "active_user_paid_rate",
        render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
        // width: 'auto',
      }
    ]
  }
];
export const specColumns = [
  {
    title: "序号",
    render: (text: any, record: any, index: any) => `${index + 1}`,
    key: "index"
  },
  {
    title: "规格编号",
    dataIndex: "spec_id"
  },
  {
    title: "规格名称",
    dataIndex: "spec_name"
  },
  {
    title: "已付单数",
    dataIndex: "paid_order"
  },
  {
    title: "未付单数",
    dataIndex: "unpaid_order"
  },
  {
    title: "付费转化率",
    dataIndex: "paid_rate",
    render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
  },
  {
    title: "规格订单占比",
    dataIndex: "order_rate",
    render: (val: any) => <span>{(val * 100).toFixed(2) + "%"}</span>
  }
];

export const searchColumns = [
  {
    title: "序号",
    render: (text: any, record: any, index: any) => `${index + 1}`,
    key: "index"
  },
  {
    title: "搜索词",
    dataIndex: "search_name"
  },
  {
    title: "搜索次数",
    dataIndex: "search_number"
  }
];

export const apiColumns = [
  {
    title: "日期",
    dataIndex: "date"
  },
  {
    title: "收入",
    dataIndex: "active_income",
    render: (val: any) => <span>{val / 100}</span>
  }
];

