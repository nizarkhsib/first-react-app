
import { Service } from '../../src/services/DBService';
import React, {Component} from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import SectionContainer from '../components/sectionContainer';

class UsersCrudComponent extends React.Component { 

    constructor(props) {
      super(props);

      this.state = {
        id: this.props.match.params.id,
        firstname: this.props.match.params.firstname,
        lastname: this.props.match.params.lastname,
        email : this.props.match.params.email,
        isLoading: true,
        rows : null,
        columns: [

            {
              label: 'Firstname',
              field: 'first',
              sort: 'asc'
            },
            {
              label: 'Lastname',
              field: 'last',
              sort: 'asc'
            },
            {
              label: 'Email',
              field: 'handle',
              sort: 'asc'
            },
            ,
            {
              label: '#',
              field: 'handle',
              sort: 'asc'
            }
        ]
      }
      this.getAllUsers();
    }

    getAllUsers(){
      Service.getUsers().then(users => {
        console.log('users : ' + users);
        this.setState({ rows: users, isLoading: false })
      });
    }

    mySubmitDB = (event) => {
      event.preventDefault();

      const newValue = {
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        email : this.state.email
      }

      Service.putUser(newValue).then( result => {
        this.getAllUsers()
      }
      );

      this.setState(
        { 
          rows : this.state.rows,
          counter : this.state.counter + 1,
          firstname : '',
          lastname : '',
          email : ''
        }
      )
    }

    render() {
      return (
        <MDBContainer className='mt-3'>
          <h5>Users</h5>
          <SectionContainer header='Add user'>
              <form onSubmit={this.mySubmitDB} >
                <div className='form-row align-items-center'>
                  <div className='col-auto'>
                    <label className='sr-only' htmlFor='inlineFormInput'>
                            Firstname
                          </label>
                          <input
                            type='text'
                            className='form-control mb-2'
                            id='Firstname'
                            placeholder='Firstname'
                            onChange={(e) => this.setState({ firstname: e.target.value })}
                            value = {this.state.firstname || '' } 
                          />  
                  </div>
                  <div className='col-auto'>
                    <label className='sr-only' htmlFor='inlineFormInput'>
                            Lastname
                          </label>
                          <input
                            type='text'
                            className='form-control mb-2'
                            id='Lastname'
                            placeholder='Lastname'
                            onChange={(e) => this.setState({ lastname: e.target.value })}
                            value = {this.state.lastname || '' } 
                          />  
                  </div>
                  <div className='col-auto'>
                    <label className='sr-only' htmlFor='inlineFormInput'>
                            Lastname
                          </label>
                          <input
                            type='email'
                            className='form-control mb-2'
                            id='Email'
                            placeholder='Email' 
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value = {this.state.email || ''} 
                          /> 
                  </div>
                  <div className='col-auto'>
                    <button type='submit' className='btn btn-primary btn-md mt-0'>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </SectionContainer>

          <MDBRow className='py-3'>
            <MDBCol md='12'>
              <SectionContainer noBorder title='List'>
                <MDBCard>
                  <MDBCardBody>
                    <MDBTable responsiveMd striped>
                      <MDBTableHead color='primary-color' columns={this.state.columns} />
                      <MDBTableBody rows={this.state.rows}/>
                    </MDBTable>
                  </MDBCardBody>
                </MDBCard>
              </SectionContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer> 
      );
    }
};

export default UsersCrudComponent;