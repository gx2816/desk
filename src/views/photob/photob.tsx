import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Table,Spin  } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import { dateYear } from "../../utils/tool"
import {incomeColumns} from "../../utils/tableList"
import { async } from 'q';
import { AnyAaaaRecord } from 'dns';
import TimerYear from "../../components/timerYear";
require('./photob.scss')
export default () => {
  
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);
  let [getyears, setGetyears] = useState([]);
  let [selectYear, setselectYear] = useState("2030");
  let [loading, setLoading] = useState(true);



  
  useEffect(() => {
    getYear()
    getTable()
  }, [])

  const getYear = () => {
    let time = new Date()
    let year = +dateYear(time)
    let count = year - 2019
    let arr:any|never=[]
    for (let i = 0; i < count; i++) {
      let obj = {
        key:i+2019,
        value:i+2019,
      }
      arr.push(obj)
    }
    setGetyears(arr)
    console.log("getYear",getyears)
  }
  const getTable = async () => {
 
  let arr:any=[]
  await photocService.incomeData({
      params: {
        start_date:"2020-01-01",
        end_date: "2021-01-01",
        category:"b"
      },
      onSuccess: ({ data }: any) => {
       arr=data
      }
    })
    photocService.incomeYear({
      params: {
        start_date:"2020-01-01",
        end_date: "2021-01-01",
        category:"b"
      },
      onSuccess: ({ data }: any) => {
        data[0].datetime="截止当前日"+data[0].datetime+"年合计"
        arr.push(data[0])
        setTabledata(arr)
        setLoading(false)
      }
    })
  }
 

  return (
    <div>
     <TimerYear selectYear={getTable}/>
     <Spin spinning={loading} tip="加载中">
        <Table
          style={{ marginTop: "20px" }}
          columns={incomeColumns as any}
          dataSource={tabledata}
          bordered
          size="small"
          pagination={false}
          title={() => '证件照B'}
        ></Table>
      </Spin>
    </div>
  )
}