Meteor.publish('Chat', function () {
  return Chat.find();
});
