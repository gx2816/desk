import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import {dateDay} from "../../utils/tool"
require('./photoc.scss')
export default () => {
  const columns = [
    {
      title: '日期',
      dataIndex: '日期',
      key: '日期',
     
    },
    {
      title: '当日订单收入',
      dataIndex: '当日订单收入',
      key: '当日订单收入',
     
    },
    {
      title: '当日新增用户',
      dataIndex: '当日新增用户',
      key: '当日新增用户',
     
    },
    {
      title: '当日订单数',
      dataIndex: '当日订单数',
      key: '当日订单数',
      
    },
  ];
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);
  let [orders, setOrders] = useState(0);
  let [ioncomes, setIncomes] = useState(0);
  let [users, setUsers] = useState(0);
  let [footer, setFooter] = useState(false);
  useEffect(() => {
    getTable()
  }, [])
  
  const formats = (value:any) => {
    var num:any = parseFloat(value);
    num = num.toFixed(2) + "";
    var str = num.split(".")[0];
    var lis = num.split(".")[1];
    var siz = 0;
    var result = "";
    for (var i = str.length - 1; i >= 0; i--) {
      siz++;
      if (siz % 3 == 0) {
        siz = 0;
        result = "," + str.substr(i, 3) + result;
      }
    }
 
    if (str.length % 3 != 0) {
      result = str.substr(0, str.length % 3) + result;
    } else {
      result = result.substring(1, result.length);
    }
    return result + "." + lis;
  }
  const getTable =async () => {
    let arr: any = []
    let today = new Date()
    let ends = dateDay(new Date(today.getTime() - 24 * 3600 * 1000))
    let count=0
    let appids=[2,3,5,24,26,81]
    let apptimes = [
      { start: "2020-05-01", end: ends },
      { start: "2020-04-01", end: "2020-04-30" },
      { start: "2020-03-01", end: "2020-03-31" },
      { start: "2020-02-01", end: "2020-02-29" },
      { start: "2020-01-01", end: "2020-01-31" },
    ]
    let num = 6
    let ids=5
    for (let i = 0; i < apptimes.length; i++) {
        /* 总数 */
      let income=0
      let users=0
      let orders = 0
    /* 展开项 */
 /*    let setIncome=0
    let setUsers=0
    let setOrders = 0 */
    
      let newChild:any=[]
      
      
      let setArr: never[]=[]
      for (let t = 0; t < appids.length; t++) {
        let objChild = {} 
        
       await photocService.orderStats({
          params: {
              start_date: apptimes[i].start,
              end_date: apptimes[i].end,
              per_page:31,
              app_id: appids[t],
              page: 1
            },
            onSuccess: ({ data }: any) => {  
              var oldChild:any=[]
              data.forEach((v: any) => {
                v.active_income=Math.round(v.active_income/100)
                income+=v.active_income
                users+=v.added_users
                orders += v.active_paid_orders
                if (t==0) {
                  objChild = {
                    日期: v.date,
                    key: count,
                    当日订单收入: v.active_income,
                    当日新增用户:v.added_users,
                    当日订单数:v.active_paid_orders,
                  }
                  newChild.push(objChild)
                } else {
                  objChild = {
                    日期: v.date,
                    key: count,
                    当日订单收入: v.active_income,
                    当日新增用户:v.added_users,
                    当日订单数:v.active_paid_orders,
                  }
                  oldChild.push(objChild)
                }
              });
              if (t > 0) {
                
                for (var i = 0; i < newChild.length; i++) {
                  newChild[i]["当日订单收入"] = (newChild[i]["当日订单收入"] + oldChild[i]["当日订单收入"])
                  newChild[i]["当日新增用户"] = (newChild[i]["当日新增用户"] + oldChild[i]["当日新增用户"])
                  newChild[i]["当日订单数"] = (newChild[i]["当日订单数"] + oldChild[i]["当日订单数"])
                  
                }
              }
            
             
              count++
             
              if (t == 5) {
                num--
                let obj = {
                  日期:`2020-0${num} 合计`,
                  key: count,
                  当日订单收入:income ,
                  当日新增用户:users,
                  当日订单数:orders,
                  children: newChild
                }
                arr.push(obj)
              
              }  
             
            }
          });
        
      } 
      ids--
    }
    let timer = setInterval(() => {
      if (ids == 0) {
        clearInterval(timer)
        let allorders = 0
        let allioncomes = 0
        let allusers = 0
        arr.map((v: any) => {
          allioncomes += v["当日订单收入"]
          allusers += v["当日新增用户"]
          allorders += v["当日订单数"]
        })
        setIncomes(allioncomes)
        setUsers(allusers)
        setOrders(allorders)
        setTabledata(arr)
        console.log(arr)
        setFooter(true)
      }
    }, 500);
}
  return (
    <div>
       <Table

        style={{ marginTop: "20px" }}
        columns={columns}
        dataSource={tabledata}
        bordered
        size="small"
        pagination={false}
        title={() => '证件照C'}
        //footer={handleFooterShow}
        
        //onChange={data}
       
      ></Table>
      <div id={footer?'showFooter':'hideFooter'} className='ant-table-footers'>
        <span style={{marginLeft: '11.7%',marginRight: '19%'}}>截止当日2020年合计</span>
        <span style={{marginRight: '20.4%'}} >{ioncomes}</span>
        <span style={{marginRight: '18.5%'}}>{users}</span>
        <span>{orders}</span>

       </div>
    </div>
  )
}