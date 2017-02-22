var Backbone = require('backbone');
var moment = require('moment');

var User = Backbone.Model.extend({
  // idAttribute: '_id'
});

var Message = Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function(){
    this.isNew() ? this.set('timestamp', moment().format('LTS')): this.set('timestamp', this.get('timestamp'));
  },
  defaults:{
    username: 'me',
    message: '',
    timestamp: ''
  }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages',
  comparator: -'timestamp',
});

module.exports = {
  User,
  Message,
  MessageCollection
}
