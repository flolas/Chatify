Bubble = new Mongo.Collection('Bubble');

Bubble.attachSchema(
  new SimpleSchema({
      chatId: {
        type: String
      },
      from: {
        type: String
      },
      message: {
        type: String
      },
      seenAt: {
        type: Date,
        optional: true
      },
      receivedAt: {
        type: Date,
        optional: true
      },
      sentAt: {
        type: Date
      }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Bubble.allow({
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
