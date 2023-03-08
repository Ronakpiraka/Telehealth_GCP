import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useLocation } from "react-router-dom";

const TheLayout = () => {
  const location = useLocation();
  let paramString = location.search.split('?')[1];
  console.log(paramString)

  return (
    <div className="c-app c-default-layout">
      { paramString == undefined && (
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
