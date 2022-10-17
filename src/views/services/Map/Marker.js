import React, { Component } from 'react'
import RoomIcon from '@material-ui/icons/Room';
export default class Marker extends Component {
  render () {
    return (
      <div style={{color: '#ffffff'}}>
        <RoomIcon />
        {this.props.text}
      </div>
    )
  }
}
