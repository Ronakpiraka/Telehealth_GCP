import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useLocation } from "react-router-dom";

const TheLayout = () => {

  const name = sessionStorage.getItem('Patient_name')
  // const location = useLocation();
  // let paramString = location.search.split('mabc=')[1];
  console.log(name)

  return (
    <div className="c-app c-default-layout">
      { name === null && (
         <TheSidebar/>
      )}
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
