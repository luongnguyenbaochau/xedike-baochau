import React, { Component } from 'react'
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom'
import ModalLogin from '../auth/ModalLogin';
import ModalRegister from '../auth/ModalRegister';
import {Logout} from '../../action/auth'
import {connect} from 'react-redux'
class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
     
    render() {
        const {isAuthenticated,profile}=this.props.auth;
        console.log(profile.userType);
        const navbarForAnonymous=(
            <Nav className="ml-auto" navbar>
                <NavItem className="mr-4">
                    <ModalLogin />
                    
                </NavItem>
                <NavItem>
                <ModalRegister/>
                
                </NavItem>
            </Nav>
        )

        const navbarForLoggedInUser=(
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret color="primary" >
                  gg
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Booktrip
                  </DropdownItem>
                  <DropdownItem>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  <Link to="/" className="nav-link" onClick={this.props.Logout}>Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
        </Nav>
        )
        return (
            <div >
                <Navbar color="light" light expand="md">
                    <NavbarBrand><Link to="/" className="nav-link"> XEDIKE </Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    {isAuthenticated ? navbarForLoggedInUser: navbarForAnonymous}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
      auth: state.authReducer
    }
  }
export default connect (mapStateToProps,{Logout}) (Header)
//<ModalLogin/>
//<Link to="/register" className="nav-link"><ModalRegister/></Link>
//<Link to="/register" className="nav-link">Register</Link>
//<Link to="/login" className="nav-link">Login</Link>