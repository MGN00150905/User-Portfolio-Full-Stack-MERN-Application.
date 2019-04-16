import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email : '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error registering in please try again');
      });
  }

  render() {
    return (
      <div className="column is-6 center">
        <div className="card ">
          <form onSubmit={this.onSubmit}>
            <h2 className = "Label">Register Below</h2>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-medium"
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>  
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-medium"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div className = "field">
              <div className="control">
                <input
                  className="input is-medium"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <input className="button is-link" type="submit" value="Submit"/>
          </form>
        </div>
      </div>

    );
  }
}
