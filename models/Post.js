Post = new Mongo.Collection('Post');
Schema = {};
Schema.Post = new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  });
  Post.attachSchema(Schema.Post);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Post.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
