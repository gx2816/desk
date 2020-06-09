import React, { useState, useEffect } from "react";
import { dateYear } from "../utils/tool";
import { Select } from 'antd';
const { Option } = Select;
interface IProp {
  selectYear: any;
}
export default (props: IProp) => {
  let [getyears, setGetyears] = useState([]);
  let [firstyears, setfirstGetyears] = useState(props.selectYear);
  useEffect(() => {
    getYear()
  }, [])
  const getYear = () => {
    let time = new Date()
    let year = +dateYear(time)
    setfirstGetyears(year)
    let count = year - 2019
    let arr:any|never=[]
    for (let i = 0; i < count; i++) {
      let obj = {
        key:i+2020,
        value:i+2020,
      }
      arr.push(obj)
    }
    setGetyears(arr)
    
  }

 const selectYear=(value: any)=> {
    console.log(`selected ${value}`);
   /*  firstGetyears(value) */
  }
  return (
    <div>
      <Select defaultValue={firstyears} style={{ width: 120,    position:'absolute',right: '3%', top: '15%',zIndex: 999 }} onChange={selectYear}>
      {getyears.map((item: any, index) => {
            return (
              <Option value={item.value} key={index}>
                {item.key}
              </Option>
            );
          })}
      </Select>
    </div>
  )
}