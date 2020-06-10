import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Table,Spin  } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import { dateYear } from "../../utils/tool"
import {incomeColumns} from "../../utils/tableList"
import { async } from 'q';
import { AnyAaaaRecord } from 'dns';
import Timeryear from "../../components/timerYear";
require('./photob.scss')
export default () => {
  
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);
  let [getyears, setGetyears] = useState([]);
  let [year, setyear] = useState(2020);
  let [loading, setLoading] = useState(true);



  
  useEffect(() => {
   /*  getYear() */
    getTable()
  }, [])

/*   const getYear = () => {
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
  } */
  const getTable = async () => {
 
    let arr: any = []
    let paramsB= {
      start_date:year+"-01-01",
      end_date: year+1+"-01-01",
      category:"b"
    }
  await photocService.incomeData({
    params:paramsB,
      onSuccess: ({ data }: any) => {
       arr=data
      }
    })
    photocService.incomeYear({
      params:paramsB,
      onSuccess: ({ data }: any) => {
        data[0].datetime="截止当前日"+data[0].datetime+"年合计"
        arr.push(data[0])
        arr.map((val: any,idx:number) => {
          val["key"] = val["datetime"]
          if (idx < arr.length - 1) {
            val["children"].map((v: any) => {
              v["key"] = v["datetime"]
            })
          }
        })
        setTabledata(arr)
        setLoading(false)
      }
    })
  }
 

  return (
    <div>
     {/* <Timeryear selectYear={getTable}/> */}
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