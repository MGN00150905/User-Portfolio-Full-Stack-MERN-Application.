import React, { Component } from 'react';
import FolioCard from './Components/FolioCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Folio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folio: []
    };
  }

  componentDidMount() {
    axios.get('/api/folios')
      .then(response => {
        this.setState({folio: response.data});
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  render(props) {

    const folioList = this.state.folio.map(u =>(
      <FolioCard
        key={u._id}
        id={u._id}
        p_name={u.p_name}
        img={u.img}
        desc={u.desc}
        url={u.url}
        author={u.user_id.name}
        user={u.user_id}
      />
    ));

    {/* Grabbing the Portfolio owners name ^^^.(author)*/}



    return (
      <div>
        {folioList.length ?
          <div>
            <h2 className="title is-4" style = {{margin:'0 auto'}}>All Portfolios</h2>
            <div className="columns is-multiline">{folioList}</div></div> :
          <h2>No Portfolios</h2> }
      </div>
    );
  }
}
