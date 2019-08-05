import React, { Component } from 'react'
import { Button } from 'reactstrap';
class Gettrip extends Component {
    render() {
      const {locationFrom,locationTo,startTime,driverId,fee} =this.props.item;
        return (
          <tr>
            <th scope="row">1</th>
            <td>{locationFrom}</td>
            <td>{locationTo}</td>
            <td>{startTime}</td>
            <td>{driverId.fullName}</td>
            <td>{driverId.phone}</td>
            <td>{fee}</td>
            <td><Button outline color="primary">Đặt chỗ</Button></td>
          </tr>
        )
    }
}
export default Gettrip