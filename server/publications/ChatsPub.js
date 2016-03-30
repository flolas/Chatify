Meteor.publish('Chats', function () {
  return Chats.find();
});
