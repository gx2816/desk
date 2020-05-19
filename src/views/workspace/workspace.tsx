import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import {dateDay} from "../../utils/tool"
require('./workspace.css')
export default () => {
  const columns = [
    {
      title: '日期',
      dataIndex: '日期',
      key: '日期',
     
    },
    {
      title: '当日所有产品收入合计',
      dataIndex: '当日所有产品收入合计',
      key: '当日所有产品收入合计',
     
    },
    {
      title: '证件照C',
      dataIndex: '证件照C',
      key: '证件照C',
     
    },
    {
      title: '证件照B',
      dataIndex: '证件照B',
      key: '证件照B',
      
    },
    {
      title: '团子相机',
      dataIndex: '当日订单数',
      key: '当日订单数',
      
    },
    {
      title: '好多曲谱',
      dataIndex: '当日订单数',
      key: '当日订单数',
      
    },
  ];
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);
  let [allincome, setallincome] = useState(0);
  let [ioncomes, setIncomes] = useState(0);
  let [ioncomesb, setIncomesb] = useState(0);
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
  const getTable = async () => {
    let arr: any = []
    let today = new Date()
    let ends = dateDay(new Date(today.getTime() - 24 * 3600 * 1000))
    let count=0
    let appids = [2, 3, 5, 24, 26, 81,25]
   
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
      let incomeb=0
      let allincome = 0
    /* 展开项 */
    /* 
    let setIncome=0
    let setUsers=0
    let setOrders = 0
    */
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
            var oldChild: any = []
            if (appids[t]!= 25) {
              data.forEach((v: any) => {
                v.active_income=Math.round(v.active_income/100)
                income += v.active_income
                allincome += v.active_income
                if (t==0) {
                  objChild = {
                    日期: v.date,
                    key: count,
                    当日所有产品收入合计: v.active_income,
                    证件照C: v.active_income,
                    证件照B:0
                  }
                  newChild.push(objChild)
                } else {
                  objChild = {
                    日期: v.date,
                    key: count,
                    当日所有产品收入合计: v.active_income,
                    证件照C: v.active_income,
                    证件照B:0
                  }
                  oldChild.push(objChild)
                }
              });
            } else {   
              data.forEach((v: any) => {
                v.active_income=Math.round(v.active_income/100)         
                incomeb += v.active_income     
                allincome += v.active_income 
                  newChild.map((e:any) => {
                    if (e.日期 == v.date) {
                      e.证件照B = v.active_income
                      e.当日所有产品收入合计+=v.active_income
                    } 
                  })
              });
              console.log(incomeb)
           }
            if (t > 0&&appids[t]!=25) {
                for (var i = 0; i < newChild.length; i++) {
                  newChild[i]["证件照C"] = (newChild[i]["证件照C"] + oldChild[i]["证件照C"])
                  newChild[i]["当日所有产品收入合计"] = (newChild[i]["当日所有产品收入合计"] + oldChild[i]["当日所有产品收入合计"])
                }
            }
            count++
            setTimeout(() => {
              
              if (t == 5) {
                num--
                console.log("证件照b",incomeb)
                let obj = {
                  日期:`2020-0${num} 合计`,
                  key: count,
                  当日所有产品收入合计:allincome,
                  证件照C:income ,
                  证件照B:incomeb ,
                  children: newChild
                }
                arr.push(obj)

              }  
            }, 200);
            }
          });
      }    
      ids--
    }
    let timer = setInterval(() => {
      if (ids == 0) {
        clearInterval(timer)
          let getioncomesc=0
          let getioncomesb=0
          let getallincome=0
          arr.map((v:any) => {
            getioncomesc+=v["证件照C"]
            getioncomesb+=v["证件照B"]
            getallincome+=v["当日所有产品收入合计"]
          })
          setIncomes(getioncomesc)
          setIncomesb(getioncomesb)
          setallincome(getallincome)
          setTabledata(arr)
          console.log(arr)
          setFooter(true)
      }
    }, 2000);
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
        title={() => '所有产品总概要'}
       
      ></Table>
      <div id={footer?'showFooter':'hideFooter'} className='ant-table-footers footer' >
        <span style={{marginLeft: '7.7%',marginRight: '16.8%'}}>截止当日2020年合计</span>
        <span style={{marginRight: '15.4%'}} >{allincome}</span>
        <span style={{marginRight: '8.3%'}}>{ioncomes}</span>
        <span>{ioncomesb}</span>

       </div>
    </div>
  )
}
