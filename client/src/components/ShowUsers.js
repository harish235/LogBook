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
    }
  }
`;

class ShowUser extends Component {

  render() {
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
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.map((user, index) => (
                        <tr key={index}>
                          {/* <td><Link to={`/show/${book._id}`}>{book.title}</Link></td> */}
                          <td>{user.name}</td>
                          <td>{user.mail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
