import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
  {
    users {
      _id
      name
      mail
      password
    }
  }
`;

class ShowUser extends Component {

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state={username:"",password:""};
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value});
      }

  render() {
    let name, password;
    return (
      <Query pollInterval={500} query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF USERS
                  </h3>
                  <h4><Link to="/create">Add Book</Link></h4>
                  <h4><Link to="/register">Add User</Link></h4>
                </div>
                <div className="panel-body">
                            <form onSubmit={e => {
                                console.log("haiiiii")
                                e.preventDefault();
                                console.log(data.users[0])
                                console.log(data.users.length)
                                let username = this.state.username
                                let password = this.state.password
                                let len = data.users.length
                                var i;
                                for(i = 0; i<len; i++){
                                    console.log("yes")
                                    if(username === data.users[i].name && password === data.users[i].password){
                                        console.log("success")
                                        this.props.history.push('/adminhome')
                                    }
                                    
                                }
                                
                            }}>
                                <div className="form-group">
                                    <label htmlFor="name">username:</label>
                                    <input type="text" className="form-control" value="" name = "username" placeholder="email"  value={this.state.username}
                onChange={this.handleChange}ref={node => {
                                        name = node;
                                    }} placeholder="username" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">password:</label>
                                    <input type="text" className="form-control" value={this.state.password} onChange={this.handleChange} name="password" ref={node => {
                                        password = node;
                                    }} placeholder="password" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {/* {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>} */}
                        </div>
                
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ShowUser;
