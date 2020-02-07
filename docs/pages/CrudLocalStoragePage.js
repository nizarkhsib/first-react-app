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

class CrudLocalStoragePage extends React.Component { 

    constructor(props) {
      super(props);
      let storage = localStorage.getItem('state'); 
      console.log(storage);
      this.state = {
        counter : 3,
        firstname : '',
        lastname : '',
        email : '',
        rows : storage ? JSON.parse(storage) :
         [
            {
              id: 1,
              firstname: 'Mark',
              lastname: 'Otto',
              email: '@mdo'
            },
            {
              id: 2,
              firstname: 'Jacob',
              lastname: 'Thornton',
              email: '@fat'
            },
            {
              id: 3,
              firstname: 'Larry',
              lastname: 'the Bird',
              email: '@twitter'
            }
        ],
        columns: [
            {
              label: '#',
              field: 'id',
              sort: 'asc'
            },
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
            }
        ]
      }
      
    }

    mySubmitHandler = (event) => {
      event.preventDefault();
      const newValue = {
        id : this.state.counter + 1,
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        email : this.state.email
      }
      this.state.rows.push(newValue);
      
      localStorage.setItem('state', JSON.stringify(this.state.rows));
      console.log(localStorage.getItem('state', JSON.stringify(this.state.rows)));
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
          <SectionContainer header='Ajouter un  user'>
              <form onSubmit={this.mySubmitHandler} >
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
                            value = {this.state.firstname} 
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
                            value = {this.state.lastname} 
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
                            value = {this.state.email} 
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
              <SectionContainer noBorder title='Liste '>
                <MDBCard>
                  <MDBCardBody>
                    <MDBTable striped>
                      <MDBTableHead columns={this.state.columns} />
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

export default CrudLocalStoragePage;