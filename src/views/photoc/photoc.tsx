import React, { useState, useEffect, Fragment } from 'react';
import { Table,Spin } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import { dateDay } from "../../utils/tool"
import {incomeColumns} from "../../utils/tableList"
require('./photoc.scss')
export default () => {
  
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);
  let [loading, setLoading] = useState(true);
  let [year, setyear] = useState(2020);
  useEffect(() => {
    getTable()
  }, [])

  const getTable = async () => {
    let arr:any=[]
    let paramsB= {
      start_date:year+"-01-01",
      end_date: year+1+"-01-01",
      category:"c"
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
      <Spin spinning={loading} tip="加载中">
        <Table
          style={{ marginTop: "20px" }}
          columns={incomeColumns as any}
          dataSource={tabledata}
          bordered
          size="small"
          pagination={false}
          title={() => '证件照C'}
        ></Table>
      </Spin>
    </div>
  )
}