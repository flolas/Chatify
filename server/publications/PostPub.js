Meteor.publish('Post', function () {
  return Post.find();
});
