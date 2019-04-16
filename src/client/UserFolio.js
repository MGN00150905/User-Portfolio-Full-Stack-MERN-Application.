import React, { Component } from 'react';
import UserFolioCard from './Components/UserFolioCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UserFolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folio: []
    };
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/folios`)
      .then(response => {
        this.setState({folio: response.data});
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(folioId) {
  // make a DELETE request to the server to remove the user with this userId
    axios
      .delete('api/folios', {
        data: {
          id: folioId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {

    const folioList = this.state.folio.map(u =>(
      <UserFolioCard
        key={u._id}
        id={u._id}
        p_name={u.p_name}
        img={u.img}
        desc={u.desc}
        url={u.url}
        author={u.user_id.name}
        uid={u.user_id}
        handleDelete={this.handleDelete}
      />
    ));

    {/* Grabbing the Portfolio owners name ^^^.(author)*/}
    {/* After populating each portfolio with user information*/}



    return (
      <div>
        {folioList.length ?
          <div>
            <h2>hello</h2>
            <h2 className="subtitle">Your Portfolios</h2>
            <Link to={`/create/${this.props.match.params.id}`} className="nav-link">Create Portfolio</Link>
            <div className="columns is-multiline">{folioList}</div></div> :
          <h2 className="subtitle">No Portfolios</h2> }
      </div>
    );
  }
}
