import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Remote Patient Monitoring</a>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="www.brillio.com" target="_blank" rel="noopener noreferrer">Brillio</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
