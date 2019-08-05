import React, { Component } from 'react'
import { Table } from 'reactstrap';
import  axios from 'axios'; 
import Gettrip from './gettrip';
class Listtrip extends Component {
  constructor(props){
    super(props);
    this.state={
      info:[]
    }
}
componentDidMount(){
  axios.get("http://localhost:5000/api/trips/getall-trip",this.state)
  .then(res=>res.data)
  .then(data=>{
      this.setState({
        info:data
      })
  })
}
  rendertrip=()=>{
    return this.state.info.map((item,index)=>{
      return (
        <Gettrip item={item} key={index} />
      )
    })
  }

    render() {
        return (
            <div className="container-fluid pt-5 pb-5 bg-light text-dark">
                <h1 className="text-center">Danh sách chuyến đi</h1>
                <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Điểm bắt đầu</th>
            <th>Điểm kết thúc</th>
            <th>Thời gian bắt đầu</th>
            <th>Tên tài xế</th>
            <th>Số điện thoại</th>
            <th>Giá vé</th>
            <th>Đặt chỗ</th>
          </tr>
        </thead>
        <tbody>
          {this.rendertrip()}
        </tbody>
      </Table>
            </div>
        )
    }
}
export default Listtrip