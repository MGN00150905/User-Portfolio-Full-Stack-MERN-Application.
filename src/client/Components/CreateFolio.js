import React, {Fragment, Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class CreateFolio extends Component {

  constructor(props) {
    super(props);
    {/* Using bind to make each function accessable with 'this.'*/}
    this.onChangeP_name = this.onChangeP_name.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      p_name: '',
      img: '',
      desc: '',
      url: '',
      user_id: this.props.match.params.id
    };
  }

  onChangeP_name(e) {
    this.setState({
      p_name: e.target.value
    });
  }

  onChangeImg(e) {
    this.setState({
      img: e.target.value
    });
  }

  onChangeDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    {/*

    console.log('Form submitted:');
    console.log(`Folio name: ${this.state.p_name}`);
    console.log(`Folio img: ${this.state.img}`);
    console.log(`Folio desc: ${this.state.desc}`);
    console.log(`Folio url: ${this.state.url}`);
    console.log(`Folio user id: ${this.state.user_id}`);
    console.log(`Params ID: ${this.props.match.params.id}`);
    */}

    const newFolio = {
      p_name: this.state.p_name,
      img: this.state.img,
      desc: this.state.desc,
      url: this.state.url,
      user_id: this.state.user_id
    };

    axios.post('/api/folios', newFolio)
      .then(res => console.log(res.data));

    this.setState({
      p_name: '',
      img: '',
      desc: '',
      url: '',
      user_id: this.props.match.params.id
    });
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit} style={{marginTop: 20}}>
          <div className="field">
            <div className="control">
              <input className="input" type="text" value={this.state.p_name} onChange={this.onChangeP_name} placeholder="Portfolio Name"/>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input className="input" type="text" value={this.state.img} onChange={this.onChangeImg} placeholder="Image"/>
            </div>
            <p className="help is-link">Please provide an image URL</p>
          </div>

          <div className="field">
            <div className="control">
              <input className="input" type="text" value={this.state.desc} onChange={this.onChangeDesc} placeholder="Description"/>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input className="input" type="text" value={this.state.url} onChange={this.onChangeUrl} placeholder="URL"/>
            </div>
            <p className="help is-link">This can be a link to your GitHub REPO or the app url if it is a Website</p>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <input type="submit" className="button is-link" value="Create PortFolio"/>
            </div>
            <div className="control">
              <Link to={`/folio/${this.state.user_id}`}><input type="submit" className="button is-warning" value="Cancel"/></Link>
            </div>
          </div>
        </form>
      </Fragment>

    );
  }
}
