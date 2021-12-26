import React from 'react';
import './Header.scss';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../../Store/actions/authActions";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Login from "../Homescreen/Login";
import Signup from "../Homescreen/Signup";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkUser: false,
            checkGeneral: false,
            checkAdmin: false,
            showlogin: false,
            showsignup: false,
            checklogin: false
        };
        this.userNav = this.userNav.bind(this);
        this.adminNav = this.adminNav.bind(this);
        this.generalNav = this.generalNav.bind(this);

    }

    displayLoginPopup = (param) => {
        this.setState({ showlogin: param });
    };
    showSignupPopup = (param) => {
        this.setState({ showsignup: param });
    }
    onLogin = (userData) => {
        this.displayLoginPopup(false);
        this.props.loginUser(userData);
    }
     onLogout = () => {
    this.props.logoutUser();
    debugger
    this.checkGeneral();
   
    }

    handleError = () => {

        alert("Please login to view buy or sell pages!")
    }

    generalNav() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <Nav.Link eventKey={2} onClick={() => this.handleError()}>Buy</Nav.Link>
                            <Nav.Link eventKey={2} onClick={() => this.handleError()}>Sell</Nav.Link>
                        </Nav>
                        <Nav>

                            {/* <Nav.Link eventKey={2} onClick={() => this.showSignupPopup(true)}>
                                Sign Up
                            </Nav.Link> */}
                            {/* {this.props.auth && this.props.auth.user && this.props.auth.user.name ? */}
                            {localStorage.getItem("loggedInUser") ?
                             <Link to="/">
                                <button
                                    className="signout"
                                    onClick={() => this.props.logoutUser()}
                                >
                                    Sign out
                                </button> </Link>: null}
                                {!localStorage.getItem("loggedInUser") ?
                                <>
                            <Nav.Link eventKey={2} onClick={() => this.showSignupPopup(true)}>
                                Sign Up
                            </Nav.Link>
                            {this.state.showsignup ? (
                                <Signup
                                    showSignupPopup={this.showSignupPopup}
                                    showsignup={this.state.showsignup}
                                ></Signup>
                            ) : null}
                            <Nav.Link eventKey={2} onClick={() => this.displayLoginPopup(true)}>
                                Log In
                            </Nav.Link>
                            {this.state.showlogin ? (
                                <Login
                                    displayLoginPopup={this.displayLoginPopup}
                                    showlogin={this.state.showlogin}
                                    onLogin={this.onLogin}
                                ></Login>
                            ) : null}
                            </>
                            :null}

                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }




    userNav() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" >
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            {/* <Nav.Link href="/sellerHome">Sellers Home</Nav.Link> */}
                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <NavDropdown title="Sell" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/addListing">Add Listing</NavDropdown.Item>
                                <NavDropdown.Item href="/viewMyListing">View my Listing</NavDropdown.Item>
                                <NavDropdown.Item href="/viewTourBooking">Tour Bookings</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Buy" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/buyerViewListing">View all Listings</NavDropdown.Item>
                                <NavDropdown.Item href="/AdvancedSearch">Advanced Search</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                            {/* <Nav.Link eventKey={2} href="#memes">
                                Log Out
                            </Nav.Link> */}
                           {localStorage.getItem("loggedInUser") ?
                           <Link to="/">
                                <button
                                    className="signout"
                                    onClick={() => this.onLogout()}
                                >
                                    Sign out
                                </button>  </Link>: null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    adminNav() {
       // debugger
       console.log("this.props in adminnav()", this.props.auth && this.props.auth.user && this.props.auth.user.role);
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/AboutUs">About</Nav.Link>
                            <Nav.Link href="#pricing">Dashboard</Nav.Link>
                            <Nav.Link href="#pricing">Users</Nav.Link>
                        </Nav>
                        <Nav>

                            {/* <Nav.Link eventKey={2} href="#memes">
                                Sign Out
                            </Nav.Link> */}
                            {this.props.auth && this.props.auth.user && this.props.auth.user.role === "admin" ? <button
                                className="signout"
                                onClick={() => this.onLogout()}
                            >
                                Sign out
                            </button> : null}
                            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    componentDidMount() {

        const loca = JSON.parse((localStorage.getItem("loggedInUser")));

        if (loca && loca.role === "user") {
            this.setState({ checkUser: true,
                checkAdmin: false,
                checkGeneral: false
            });
        }

        if (loca && loca.role === "admin") {
            this.setState({ checkAdmin: true,
                checkUser: false ,
                heckGeneral: false
             })
        }

    }

    checkAdmin = () => {
        this.setState({ checkAdmin: true,
            checkUser: false,
            checkGeneral: false 
         });
    }

    checkUser = () => {
        this.setState({ checkUser: true,
            checkAdmin: false,
            checkGeneral: false });

    }

    checkGeneral = () => {
        this.setState({ checkGeneral: true,
            checkUser: false,
            checkAdmin: false  });
    }

    componentDidUpdate(prevState, prevProps) {
        console.log("this.props", this.props);
        const loca = JSON.parse((localStorage.getItem("loggedInUser")));
        console.log("loca", loca);
        // if ((this.props.auth &&  this.props.auth.user && this.props.auth.user.role === "admin")
        if(loca && loca.role === "admin" && prevState.checkAdmin === false){
        //  && (prevProps.auth.user.role !== this.props.auth.user.role)) {
            this.checkAdmin()
        }

        else if ((this.props.auth.user.role === "user") && (this.state.checkUser !== true)) {
            this.checkUser()
        }
        // else if(this.props.auth.user.role==undefined && prevState.checkUser == true){
        //     this.checkGeneral();
        // }
        console.log("hi5" + this.props.auth === true)
    }

    render() {

        
        // let loca = "";
        // if(this.props.auth && this.props.auth.loginSuccess){
        //      loca = JSON.parse((localStorage.getItem("loggedInUser")));
        // }
       

        // console.log("window.location.href ", window.location.href);

        const loca = JSON.parse((localStorage.getItem("loggedInUser")));


        console.log("admin:" + this.state.checkAdmin, "user:" + this.state.checkUser, "general:" + this.state.checkGeneral, "loca", loca)
        return (

            <div>

                <nav className="headerBody" alight="left">
                    <div>
                        <a href="/">
                            < img alt="HOMeby.png" src="assets/HOMeby.png" className="homesc-logo" />
                        </a>
                    </div>

                    <div className="navBar">
                        {loca ? <h6 className="navText">Hi {loca.name}</h6> : null}

                        {/* Style below lines for user name display on Header */}

                        {/* {this.props.auth && this.props.auth.user && this.props.auth.user.name ?
                            <h3>Hi {this.props.auth && this.props.auth.user && this.props.auth.user.name} </h3> : null} */}
                        {this.state.checkAdmin ? this.adminNav() : this.state.checkUser ? this.userNav() : this.generalNav()
                        }
                        {/* this.props.auth.user.role */}

                    </div>
                </nav>

            </div>


        );
    }
}
Header.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    //loginSuccess: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser, logoutUser }
)((Header));