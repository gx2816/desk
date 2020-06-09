import React, { useState, useEffect, Fragment } from 'react';
import { Table,Spin } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import {incomeColumns} from "../../utils/tableList"
require('./workspace.css')
export default () => {

  let [loading, setLoading] = useState(true);
  const data:any= [];
  let [tabledata, setTabledata] = useState(data);


  useEffect(() => {
    getTable()
  }, [])
  

  const getTable =  () => {
    let arr:any=[]
    photocService.incomeData({
        params: {
          start_date:"2020-01-01",
          end_date: "2021-01-01",
          category:"all"
        },
        onSuccess: ({ data }: any) => {
         arr=data
         photocService.incomeYear({
          params: {
            start_date:"2020-01-01",
            end_date: "2021-01-01",
            category:"all"
          },
          onSuccess: ({ data }: any) => {
            data[0].datetime="截止当前日"+data[0].datetime+"年合计"
            arr.push(data[0])
            setTabledata(arr)
            setLoading(false)
     
           
          }
        })
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
          title={() => '所有产品总概要'}
        ></Table>
      </Spin>
    </div>
  )
}
