import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Card , Row, Col ,CardTitle} from 'reactstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            errors:{}

        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault()//chan mac dinh cua form from co method="GET"
        //axios.post("http://localhost:5000/api/users/login",this.state)
    //     //dùng proxy 
    //     //const {email,password}=this.state;
    //    this.props.login(this.state,this.props.history)
            
        
    }
    render() {
        return (
            <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card>
            <CardTitle>Special Title Treatment</CardTitle>
            <div className="container text-left">
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
                    <Button>Submit</Button>
                </Form>
            </div>
            </Card>
            </Col>
            </Row>
        )
    }
}
export default Login