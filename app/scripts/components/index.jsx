var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var models = require('../models/chat-models.js');
var LoginForm = require('./login.jsx').LoginForm;

var messageCollection = new models.MessageCollection();

var ChatContainer = React.createClass({
  componentWillMount: function(){
     window.setInterval(this.getMessages, 3000);
  },
  getInitialState: function(){
    // var messageCollection = new models.MessageCollection();
    var self = this;
    messageCollection.fetch().done(function(){
      self.setState({messageCollection: messageCollection});
      self.forceUpdate();
    });
    return {
      messageList: messageCollection,
      username: this.props.router.username
    }
  },
  getMessages: function(){
    var self = this;
      messageCollection.fetch().done(function(){
        self.setState({messageCollection: messageCollection});
      });
  },
  addPost: function(message){
    var messageList = this.state.messageList;
    message.username = this.state.username;
    messageList.create(message);
    this.setState({messageList: messageList});
  },
  render: function(){
    return (
      <div className="container">
        <div className="col-md-10 col-md-push-1">
          <h1>TIY Too Cool for School Chat App</h1>
          <div className="col-md-3 addChat">
          <MessageForm addMessage={this.addPost} />
          </div>
          <div className="col-md-7 chatList">
          <MessageList messagePost={this.state.messageList} />
          </div>
        </div>
      </div>
    )
  }
})

var MessageForm = React.createClass({
  getInitialState: function(){
    var chat = {message: ''};
    return chat;
  },
  handleMessageChange: function(event){
    this.setState({message: event.target.value})
  },
  addMessage: function(event){
    event.preventDefault();
    this.props.addMessage(this.state);
    this.setState({message: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.addMessage}>
        <div className="form-group">
          <label htmlFor="message">Join the convo:</label>
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
          <span className="name">{post.get('username')}</span><span> says</span> <p>{post.get('message')}</p>
          <span className="time">{post.get('timestamp')}</span>
        </li>
      )
    });
    return (
      <div class="chat-messages">
        <h2>Chatty Chat</h2>
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
