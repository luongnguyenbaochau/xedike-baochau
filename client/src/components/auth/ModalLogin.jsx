import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {login} from '../../action/auth';
class ModalLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          email:"",
          password:"",
          errors:{}
        };
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

  
    onSubmit=(e)=>{
        e.preventDefault();
       // console.log(this.state);
       this.props.login(this.state,this.props.history)
            
        
    }




    render() {
        return (
            <div>
             <Button color="primary" onClick={this.toggle} >Login</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
              <ModalHeader toggle={this.toggle}>Đăng nhập tài khoản xedike</ModalHeader>
              <ModalBody>
              <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="with a placeholder"
                         value={this.state.email} onChange={this.onChange}
                         />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password placeholder" 
                         value={this.state.password} onChange={this.onChange}
                        />
                    </FormGroup>
                    <Button color="primary" >Submit</Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        )
    }
}
export default connect (null,{login}) (ModalLogin)