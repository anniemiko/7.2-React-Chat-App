var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ChatContainer = require('./components/index.jsx').ChatContainer;



var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(ChatContainer),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
