import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TableComponent extends Component{

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getList();
  }

  renderContent(){
    const { props }  = this;
    if(props.list.length == 0) {
      return <div> Loading </div>
    }
    const ListItem = props.list.map((item) => {
      return (
        <div className='divTableRow' key={item.index}>
          <div className='divTableCell'>{item.id}</div>
          <div className='divTableCell'>{item.Time}</div>
          <div className='divTableCell'>{item.Content}</div>
          <div className='divTableCell'>{item.Category}</div>
        </div>
      )
    })
    return ListItem;
  }

  render(){
    return (
      <div className=''>
        <div className='divTable GridTable'>
          <div className='divTableBody'>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps, actions)(TableComponent);