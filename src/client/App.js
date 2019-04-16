import React, { Fragment, Component } from 'react';
import { Link, Route, Switch, Router } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import UserFolio from './UserFolio';
import Folio from './Folio';
import Login from './Login';
import UserList from './UserList';
import Register from './Register';
import CreateFolio from './Components/CreateFolio';
import EditFolio from './Components/EditFolio';
import axios from 'axios';
import plus from './Components/plus.svg';





class App extends Component {
  constructor() {
    super();
    {/* Storing user details in state*/}
    this.state = {loggedIn: false, user: {email: '', name:''}};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login(user) {

    this.setState({loggedIn: true, user: user});
  }

  render() {
    {/* console.log(this.state);*/}
    return (
      <Fragment>
        <nav
          className="navbar "
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="subtitle is-5 col">Portfolio Website</h1>
            </a>

            <div
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item ">
                <Link className="" to="/">
                  Home
                </Link>
              </div>
              {this.state.loggedIn &&
              <div className="navbar-item ">
                <Link className="" to={`/folio/${this.state.user._id}`}>
                  Your Portfolios
                </Link>
              </div>}
              {this.state.loggedIn &&
              <div className="navbar-item ">
                <Link className="" to="/users">
                  Explore Fellow Devs
                </Link>
              </div>}
              {!this.state.loggedIn &&
              <div className="navbar-item ">
                <Link className="" to="/login">
                  Login
                </Link>
              </div>}
              {!this.state.loggedIn &&
              <div className="navbar-item ">
                <Link className="" to="/register">
                  Register
                </Link>
              </div>}
              {/* Only show logout button after the user has logged in*/}
              {this.state.loggedIn &&
              <div className="navbar-item ">
                <Link className="" to="/logout">
                  Logout
                </Link>
              </div>}
              {this.state.loggedIn &&
              <div className="navbar-item ">
                <Link to={`/create/${this.state.user._id}`} className="nav-link"><img alt="img"  src={plus} /></Link>
              </div>}
            </div>
          </div>
        </nav>

        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Welcome Back {this.state.user.name}!
              </h1>
              <h2 className="subtitle">

              </h2>
            </div>
          </div>
        </section>



        {/* React Router, Switching between differen pages.*/}

        <Switch>
          <Route path="/" exact component={withAuth(Folio )} />
          <Route path="/users" component={withAuth(UserList )} />
\         <Route path="/folio/:id" render={(props) => <UserFolio {...props} user={this.state.user.name} />} />
          <Route path="/register" component={Register} />
          //Passing props to login, using render instead of component so that the component renders properly each time.
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
          <Route path="/create/:id" component={withAuth(CreateFolio)} />
          <Route path="/edit/:id" component={withAuth(EditFolio)} />

        </Switch>
      </Fragment>
    );
  }
}

export default App;
