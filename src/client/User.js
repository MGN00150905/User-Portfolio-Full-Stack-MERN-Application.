import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="column is-3">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-6">{this.props.name}</p>
                  <p className="subtitle">{this.props.email}</p>
                </div>
              </div>
              <Link to={`/folio/${this.props.id}`}>
                <button className="button is-link" type="button">
                      View Portfolios
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default User;
