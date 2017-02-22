var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var models = require('../models/chat-models.js');

var LoginContainer = React.createClass({
  loginUser: function(user){
    var router = this.props.router;
    router.username = user.username;
    localStorage.setItem('username', user.username);
    router.navigate('', {trigger: true})
  },
  render: function(){
    return(
      <div>
        <LoginForm loginUser={this.loginUser}/>
      </div>
    )
  }
});

var LoginForm = React.createClass({
  getInitialState: function(){
    return {username: ''};
  },
  handleUsernameChange: function(event){
    this.setState({username: event.target.value})
  },
  handleLogin: function(event){
    event.preventDefault();
    var user = this.state;
    this.props.loginUser(user);

    this.setState({username: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleLogin}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input onChange={this.handleUsernameChange} value={this.state.username} type="text" className="form-control" id="userName" placeholder="Your username"/>
        </div>
        <input type="submit" className="btn btn-success" value="Login"/>
      </form>
    )
  }
});

module.exports = {
  LoginContainer,
  LoginForm
}
