import {Carousel} from 'react-bootstrap';
import React, { useEffect, useState }  from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { Card, Button } from "react-bootstrap";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUsers } from "../../Store/actions/adminActions";
import { getMessages } from "../../Store/actions/messageActions";
import { getContacts } from "../../Store/actions/contactActions";

class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showlogin: false,
      showsignup: false,
      users:[],
    };
  }
 
  
  componentDidMount(){
    this.props.getAllUsers();
    this.props.getMessages();
    this.props.getContacts();

  }
  
  render() {
   return (
    
     <>
     {this.props.admin ?
       <div className="ag-theme-alpine" style={{height: 900, width: '60%', marginLeft:300}}>
           <AgGridReact
               rowData={this.props.admin.allUsers}>
                  <AgGridColumn field="Users of HomesByASAP" width={850}>
               <AgGridColumn field="name" width={500}></AgGridColumn>
               <AgGridColumn field="email" width={350}></AgGridColumn>
               </AgGridColumn>
           </AgGridReact>
       </div> : null
  }
 {
    this.props.contacts.contacts.length >0? this.props.contacts.contacts.map((contact) => { 
    return (
      <div>
 <Card bg="success">
  <Card.Body>
    <Card.Title>{contact.name}</Card.Title>
    <Card.Text>
      {contact.message}
    </Card.Text>
    <footer className="">
      Email: {contact.email} <br/>
      Contact: {contact.contact}
      </footer>
    
  </Card.Body>
</Card> </div>);
     }) : null
  } 
  
      <div  className="adminCarousel">
<Carousel variant="dark" >
{
    this.props.messages.messages.length >0? this.props.messages.messages.map((message) => { 
      console.log("message", message);
    return (
         <Carousel.Item interval={5000}>
         <Card bg="primary">
  <Card.Body>
    <Card.Title>{message.sellerEmailId}</Card.Title>
    <Card.Text>
      {message.description}
    </Card.Text>
   
    
  </Card.Body>
</Card>
           
         </Carousel.Item>);
 }) : null
}

       </Carousel>
       </div>
  
       </>
   );
  }
};
Admin.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  //loginUser: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  admin: state.admin,
  messages: state.messages,
  contacts: state.contacts
});

export default connect(
  mapStateToProps,
  {  getAllUsers, getMessages, getContacts }
)((Admin));
