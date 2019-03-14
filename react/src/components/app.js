import React, { Component } from 'react';
import axios from 'axios';
import TableComponent from './table_component';

export default class App extends Component {

  constructor (props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    const setState = this.setState.bind(this)
    axios.get(`http://127.0.0.1:3000/getlist`)
      .then(function (res) {
        setState({
          data: res.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state

    if (data.length == 0) {
      return <div>Loading</div>
    }
    return <TableComponent data={data}/>
  }
}
