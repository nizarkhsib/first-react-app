
import { Service } from '../../src/services/DBService';
import React, {Component} from 'react';
import {
    MDBContainer,
    MDBTreeview,
    MDBTreeviewList,
    MDBTreeviewItem,
    MDBCol,
    MDBRow
} from 'mdbreact';
import DocsLink from '../components/docsLink';
import SectionContainer from '../components/sectionContainer';

class DataCatalogPage extends React.Component { 

    constructor(props) {
      super(props);
      let storage = localStorage.getItem('state'); 
      console.log(storage);
      this.state = {
        id: this.props.match.params.id,
        firstname: this.props.match.params.firstname,
        lastname: this.props.match.params.lastname,
        email : this.props.match.params.email,
        isLoading: true,
        names: ['Nizar', 'Salah', 'Justine']
      }
      this.getData();
    }

    getData() {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
    
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
    
          console.log(JSON.parse(xhr.responseText))
          const str = console.log('str : ' + str.substring(1, xhr.responseText.length));
          const arr = str.split(',');
          console.log(arr);

          this.setState({
              names : arr
          })
        })

        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:5000/SDK/Data/v1.0/entity_names?id=035QSD')
        // send the request
        xhr.send()

        console.log('names state : ' + this.state.names);
    }

    render() {
      return (
        <MDBContainer>
       <SectionContainer header='Data Catalog'>
          <MDBCol md='4'>
            <MDBTreeview
              theme='animated'
              header='Folders'
              className='w-20'
              getValue={value => console.log(value)}
            >
                {this.state.names.map(function(name, index){
                    return <MDBTreeviewItem title={name} far />;
                })}
              

            </MDBTreeview>
          </MDBCol>
        </SectionContainer>

        </MDBContainer>
      );
    }
};

export default DataCatalogPage;