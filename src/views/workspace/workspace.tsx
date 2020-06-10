import React, { useState, useEffect, Fragment } from 'react';
import { Table,Spin } from 'antd';
import 'antd/dist/antd.css';
import photocService from '../../service/photocService';
import {allincomeColumns} from "../../utils/tableList"
require('./workspace.css')
export default () => {

  const data:any= [];
  let [loading, setLoading] = useState(true);
  let [tabledata, setTabledata] = useState(data);
  let [year, setyear] = useState(2020);


  useEffect(() => {
    getTable()
  }, [])
  

  const getTable = async () => {
    let arrb:any=[]
    let arrc:any = []
    let paramsB= {
      start_date:year+"-01-01",
      end_date: year+1+"-01-01",
      category:"b"
    }
    let paramsC= {
      start_date:year+"-01-01",
      end_date: year+1+"-01-01",
      category:"c"
    }
    await photocService.incomeData({
        params:paramsB,
        onSuccess: ({ data }: any) => {
         arrb=data
         photocService.incomeYear({
          params:paramsB,
          onSuccess: ({ data }: any) => {
            data[0].datetime="截止当前日"+data[0].datetime+"年合计"
            arrb.push(data[0])
        
          }
        })
        }
    })
    photocService.incomeData({
      params:paramsC,
      onSuccess: ({ data }: any) => {
      arrc=data
      photocService.incomeYear({
        params:paramsC,
        onSuccess: ({ data }: any) => {
          data[0].datetime="截止当前日"+data[0].datetime+"年合计"
          arrc.push(data[0])
          arrb.map((val: any, idx: number) => {
            val["b端"] =val["order_income"]
            val["key"] =val["datetime"]
            val["c端"] =arrc[idx]["order_income"]
            val['all端'] = arrc[idx]["order_income"] + val["order_income"]
            if (idx<arrb.length-1) {
              val["children"].map((v: any, i: number) => {
                v["b端"] =v["order_income"]
                v["key"] =v["datetime"]
                v["c端"] =arrc[idx]["children"][i]["order_income"]
                v['all端'] = v["c端"]+ v["b端"]
              })
          }
          })
          let arr = arrb
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
          columns={allincomeColumns as any}
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
