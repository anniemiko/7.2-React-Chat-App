var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var models = require('../models/chat-models.js');

var ChatContainer = React.createClass({
  getInitialState: function(){
    var messageCollection = new models.MessageCollection();
    var self = this;
    messageCollection.fetch().done(function(){
      self.setState({messageList: messageCollection});
      self.forceUpdate();
    });
    return {
      messageList: messageCollection
    }
  },
  addMessage: function(message){
    var messageList = this.state.messageList;
    messageList.create(message);
    this.setState({messageList: messageList});
  },
  render: function(){
    return (
      <div className="container">
        <div className="col-md-6 col-md-push-3">
          <h1>Super Cool Chat App</h1>
          <UsernameForm addUser={this.addUser} />
          <MessageForm addMessage={this.addMessage} />
          <MessageList messagePost={this.state.messageList} />
        </div>
      </div>
    )
  }
})

var UsernameForm = React.createClass({
  getInitialState: function(){
    var name = {username: ''};
    return name;
  },
  addUser: function(event){
    event.preventDefault();
    this.props.addUser(this.state);
    this.setState({username: ''});
  },
  handleUsernameChange: function(){
    this.setState({username: event.target.value})
  },
  render: function(){
    return (
      <form onSubmit={this.addUser}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" id="userName" placeholder="username"/>
        </div>
        <input type="submit" className="btn btn-success" value="Add User"/>
      </form>
    )
  }
});

var MessageForm = React.createClass({
  getInitialState: function(){
    var chat = {message: ''};
    return chat;
  },
  handleMessageChange: function(){
    this.setState({message: event.target.value})
  },
  addMessage: function(event){
    event.preventDefault();
    this.props.addMessage(this.state);
    this.setState({message: ''});
  },
  render: function(){
    console.log(this.state.message);
    return (
      <form onSubmit={this.addMessage}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input value={this.state.message} onChange={this.handleMessageChange} type="text" className="form-control" id="message" placeholder="message"/>
        </div>
        <input type="submit" className="btn btn-primary" value="Post Message"/>
      </form>
    )
  }
});

var MessageList = React.createClass({
  render: function(){
    var posts = this.props.messagePost.map(function(post){
      return (
        <li key={post.cid}>
          <p>{post.get('username')} says {post.get('message')}</p>
          <span>{post.get('timestamp')}</span>
        </li>
      )
    });
    return (
      <div>
        <h2>Messages</h2>
        <ul className="messageList">
          {posts}
        </ul>
      </div>

    )
  }
})

module.exports = {
  ChatContainer
}
