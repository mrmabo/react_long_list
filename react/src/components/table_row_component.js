import React, {Component} from 'react'
export default class TableRowComponent extends Component {

  componentDidMount() {
    this.props.cachePosition(this.node, this.props.index)
  }

  render() {
    const {index, item} = this.props
    return (
      <div className='divTableRow' index={index} style={{ height: 'auto' }} ref={node => { this.node = node }}>
        <div className='divTableCell'>{item.id}</div>
        <div className='divTableCell'>{item.Time}</div>
        <div className='divTableCell'>{item.Content}</div>
        <div className='divTableCell'>{item.Category}</div>
      </div>
    )
  }
}