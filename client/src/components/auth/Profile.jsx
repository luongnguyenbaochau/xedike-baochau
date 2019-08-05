import React, { Component } from 'react'
import {Container, Row, Col, Button, Form, FormGroup, Label, Input,Card } from 'reactstrap';
import {login} from '../../action/auth'
import {connect} from 'react-redux'
import {getMyProfile} from '../../action/auth'
//import getFingerprint from '../../helpers/getFingerprint'
//import setHeaders from '../../helpers/setHeader'
import axios from 'axios';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            fullName:"",
            phone:"",
            DOB:"",
            userType:"",
            avatar:"",
            file: null


        }
    }
    onChange=(e)=>{
        console.log(e.target.files)
        this.setState({
            [e.target.name]:e.target.value,
            file: e.target.files && e.target.files[0]
        },()=>{
            const formData= new FormData();
            formData.append("avatar", this.state.file)
            axios.post("/api/users/upload-avatar",formData)
                .then(res=>this.setState({
                    avatar: res.data.avatar
                }))
                .catch(err=>console.log(err))
        })
        
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.props.login(this.state,this.props.history)   
    }
    componentDidMount(){
        const token= localStorage.getItem("token");
        if(!token) return;
        
            let {profile} =this.props.auth;
            this.props.getMyProfile(profile.id,(user)=>{
              // console.log(user);
                this.setState(user)
          
       
        })
       

    }
    componentWillReceiveProps=(nextProps)=>{
        const {profile}= nextProps.auth;
        this.setState(profile)
    }
render(){
    return <div>
        <Card body inverse style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(./image/xe1.jpg)"
    }}>
        <h1 className="text-center">My Profile</h1>
        <Container>
            <Row>
                <Col md={5}>
                    <img src={`http://localhost:5000/${this.state.avatar}`}
                    alt="avatar">
                    
                    </img>
                    <input type="file" name="file" onChange={this.onChange} file={this.state.file}/>
                </Col>
                <Col md={7}>
                    <h4>MY INFO</h4>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail" className="d-flex justify-content-between">Email
                                </Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" 
                                value={this.state.email} onChange={this.onChange}
                               
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userType">User type:</Label>
                                <Input type="select" name="userType" id="usertype" onChange={this.onChange} disabled>
                                <option value="-1">Select user type...</option>
                                <option value="passenger">Passenger</option>
                                <option value="driver">Driver</option>
                                </Input>
                            </FormGroup>
                                <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="number" name="phone" id="phone" placeholder="Enter phone..." 
                                value={this.state.phone} onChange={this.onChange}

                            />
                            </FormGroup>
                            <FormGroup>
                                <Label for="DOB">DOB</Label>
                                <Input type="date" name="DOB" id="DOB" placeholder="Enter DOB..." 
                                value={this.state.DOB} onChange={this.onChange}

                                />
                            </FormGroup>
                        <Button>Submit</Button>
                        </Form>
                </Col>
            </Row>
        </Container>
        </Card>
    </div>
    }
}
const mapStateToProps=(state)=>{
    return {
      auth: state.authReducer
    }
  }
export default connect(mapStateToProps,{login,getMyProfile})(Profile)
