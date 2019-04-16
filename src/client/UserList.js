import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import UserFolio from './UserFolio';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios.get('api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const userList = this.state.users.map(u => (
      <User
        key={u._id}
        id={u._id}
        email={u.email}
        name={u.name}
      />
    ));

    return (
      <div>
        {userList.length ?
          <div>
            <h2>Alls Users</h2>
            <div className="columns is-multiline">{userList}</div></div> :
          <h2>No Users</h2> }
      </div>
    );
  }
}

export default UserList;
