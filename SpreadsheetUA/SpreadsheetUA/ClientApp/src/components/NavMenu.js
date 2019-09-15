import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavMenu.css';


const userLinks = (
    <div>
        <NavItem>
            <NavLink tag={Link} className="text-light" to="/login">Logout</NavLink>
        </NavItem>
      
    </div>
);


const guestLinks = (
    <div>
        <NavItem>
            <NavLink tag={Link} className="text-light" to="/registration">Registration</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-light" to="/login">Log in</NavLink>
        </NavItem>
    </div>
);


  class NavMenu extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
        <header>
            <Navbar color="dark" className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" dark >
                <Container>
                    <NavbarBrand  tag={Link} to="/">SpreadsheetUA</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                        <ul className="navbar-nav flex-grow">

                            {this.props.loggedIn ? userLinks : guestLinks}
                            
                        </ul>
            </Collapse>
          </Container>
            </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state) {
    const { loggedIn,user} = state.authentication;
    return {
        loggedIn,
        user
    };
}
export default connect(mapStateToProps)(NavMenu);



