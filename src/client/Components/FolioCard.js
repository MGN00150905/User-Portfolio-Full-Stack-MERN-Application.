import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';




class FolioCard extends React.Component {

  render() {
    return (
      <Fragment>
        <div className="column is-3">
          <div className="card" style={{height:'100%'}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img alt={this.props.p_name} src={this.props.img} />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-6">{this.props.p_name}</p>
                  <p className="subtitle is-6">{this.props.desc}</p>
                  <a href = {this.props.url} target=" "><button className = "button" style={{color:'purple'}}>Github Link</button></a>
                  <p className="subtitle is-6">Developed By:{this.props.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default FolioCard;
