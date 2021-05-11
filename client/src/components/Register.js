import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import Select from 'react-select';

const ADD_USER = gql`
    mutation adduser12(
        $name: String!,
        $mail: String!,
        $password: String!) {
        adduser12(
            name: $name,
            mail: $mail,
            password: $password) {
            _id
        }
    }
`;


class Register extends Component {

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state={category: "Admin"};
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value});
      }
  
    render() {
      let name, mail, password;
      return (
        <Mutation mutation={ADD_USER} onCompleted={() => this.props.history.push('/')}>
            {(addBook, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD USER
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                console.log(this.state.category)
                                if(this.state.category === "User"){
                                    addBook({ variables: { name: name.value, mail: mail.value, password: password.value } });
                                }
                                else {

                                }
                                //addBook({ variables: { name: name.value, mail: mail.value, password: password.value } });
                                // isbn.value = "";
                                // title.value = "";
                                // author.value = "";
                                // description.value = "";
                                // publisher.value = null;
                                // published_year.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" name="name" ref={node => {
                                        name = node;
                                    }} placeholder="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mail">Email ID:</label>
                                    <input type="text" className="form-control" name="mail" ref={node => {
                                        mail = node;
                                    }} placeholder="mail ID" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password for User:</label>
                                    <input type="text" className="form-control" name="password" ref={node => {
                                        password = node;
                                    }} placeholder="password" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="role">Your role:</label>
                                    <select id = "dropdown"  name="category" value={this.state.category} onChange={this.handleChange}>
                                        <option value="Admin" selected>Admin</option>
                                        <option value="User">User</option>
                                      

                                    </select>
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
  
  export default Register;