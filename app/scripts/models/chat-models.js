var Backbone = require('backbone');

var User = Backbone.Model.extend({
  // idAttribute: '_id'
});

var Message = Backbone.Model.extend({
  idAttribute: '_id',
  defaults:{
    username: 'me',
    message: '',
    timestamp: ''
  }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages'
});

module.exports = {
  User,
  Message,
  MessageCollection
}
