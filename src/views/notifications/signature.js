import { width } from '@mui/system'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas'

import styles from './Consent.css'

export default class App extends Component {
  state = {trimmedDataURL: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
  }
  render () {
    let {trimmedDataURL} = this.state
    return (
    <div >
      <div className={styles.sigContainer} style={{border:'solid', backgroundColor:'white', cursor:'pointer', width:'455px'}}>
        <SignaturePad 
          ref = {(ref) => { this.sigPad = ref }}/>
      </div>
      <div>
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Preview
        </button>
      </div>
      {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} />
        : null}
    </div>
    )
  }
}

