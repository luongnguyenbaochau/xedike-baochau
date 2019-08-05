import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {register} from '../../action/auth';
import {connect} from 'react-redux'
//import  axios from 'axios'; 
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            password2:"",
            fullName:"",
            phone:"",
            dateOfBirth:"",
            userType:"",
            errors:{}

        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        // axios.post("http://localhost:5000/api/users/register",this.state)
        // .then(res=>{
        //     console.log(res);
        // })
        this.props.register(this.state,this.props.history)
        
    }
    render() {
        return (
            <div className="container text-left">
                 <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="email"  className="d-flex justify-content-between">Email
                        <span className="text-danger">{this.props.errors.email ? this.props.errors.email : ""}</span>
                        </Label>
                        <Input type="email" name="email" id="email" placeholder="with a placeholder" value={this.state.email} onChange={this.onChange}
                        invalid={this.props.errors.email ? true :false}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="d-flex justify-content-between">Password
                        <span className="text-danger">{this.props.errors.password ? this.props.errors.password : ""}</span>
                        </Label>
                        <Input type="password" name="password" id="password" placeholder="password placeholder" value={this.state.password} onChange={this.onChange}
                         invalid={this.props.errors.password ? true :false}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password2" className="d-flex justify-content-between">Confirm Password</Label>
                        <Input type="password" name="password2" id="password2" placeholder="password placeholder" value={this.state.password2} onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="fullName">Full name</Label>
                        <Input type="text" name="fullName" id="fullName" placeholder="Enter fullName" value={this.state.fullName} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userType">User type:</Label>
                        <Input type="select" name="userType" id="userType" value={this.state.userType} onChange={this.onChange}>
                            <option value="-1">Select user type...</option>
                            <option value="passenger">Passnger</option>
                            <option value="driver">Driver</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone" className="d-flex justify-content-between">Phone
                        <span className="text-danger">{this.props.errors.phone ? this.props.errors.phone : ""}</span>
                        </Label>
                        <Input type="number" name="phone" id="phone" placeholder="Enter phone" value={this.state.phone} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dateOfBirth">DOB</Label>
                        <Input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Enter DOB" value={this.state.dateOfBirth} onChange={this.onChange}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}
// lay dl cua store xuosng de xai shpow giao dien
const mapStateToprops=(state)=>{
    return {
        errors: state.errorsReducer
        
    }
}
export default  connect(mapStateToprops,{register}) (Register);