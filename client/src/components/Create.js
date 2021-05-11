import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_BOOK = gql`
    mutation addBook(
        $phno: String!,
        $desc: String!) {
        addBook(
            phno: $phno,
            desc: $desc) {
            _id
        }
    }
`;

class Create extends Component {
  
    render() {
      let phno, desc;
      return (
        <Mutation mutation={ADD_BOOK} onCompleted={() => this.props.history.push('/')}>
            {(addBookk, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD LOGS
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">LOGS List</Link></h4>
                            <form onSubmit={e => {
                                console.log("haiiiii")
                                e.preventDefault();
                                addBookk({ variables: { phno: phno.value, desc: desc.value } });
                                // isbn.value = "";
                                // title.value = "";
                                // author.value = "";
                                // description.value = "";
                                // publisher.value = null;
                                // published_year.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="phno">Phone number:</label>
                                    <input type="text" className="form-control" name="phno" ref={node => {
                                        phno = node;
                                    }} placeholder="Phone number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc">Description:</label>
                                    <input type="text" className="form-control" name="desc" ref={node => {
                                        desc = node;
                                    }} placeholder="Description" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;