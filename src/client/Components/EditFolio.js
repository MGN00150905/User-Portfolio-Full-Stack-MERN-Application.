import React, {Component} from 'react';
import axios from 'axios';

export default class EditFolio extends Component {

  constructor(props) {
    super(props);

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

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/folios`)
      .then(response => {
        this.setState({
          p_name: response.data.p_name,
          img: response.data.img,
          desc: response.data.desc,
          url: response.data.url
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const obj = {
      _id: this.props.match.params.id,
      p_name: this.state.p_name,
      img: this.state.img,
      desc: this.state.desc,
      url: this.state.url
    };
    axios.put('/api/folios/', obj)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Update Portfolio</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Portfolio Name: </label>
            <input  type="text"
              className="form-control"
              value={this.state.p_name}
              onChange={this.onChangeP_name}
            />
          </div>
          <div className="form-group">
            <label>Image URL: </label>
            <input  type="text"
              className="form-control"
              value={this.state.img}
              onChange={this.onChangeImg}
            />
          </div>
          <div className="form-group">
            <label>Project Description: </label>
            <input  type="text"
              className="form-control"
              value={this.state.desc}
              onChange={this.onChangeDesc}
            />
          </div>
          <div className="form-group">
            <label>URL: </label>
            <input  type="text"
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <label>UserID: </label>
            <input  type="text"
              className="form-control"
              value={this.state.user_id}
              readOnly
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update PortFolio" className="btn btn-warning" />
          </div>
        </form>
      </div>
    );
  }
}
