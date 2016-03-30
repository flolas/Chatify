Chat = new Mongo.Collection('Chat');

Chat.attachSchema(
  new SimpleSchema({
    title: {
      type: String,
      label: "Title of Chat",
      max: 150,
      min: 0
    },
    style: {
      type: String,
      label: "Style of Chat"
    },
    batteryLevel: {
      type: Number,
      label: "Battery Level",
      max: 100,
      min: 1,
      optional: true
    },
    carrierName: {
      type: String,
      label: "Carrier Name",
      optional: true
    },
    signalStrength: {
      type: Number,
      label: "Signal Strength",
      max: 5,
      min: 0,
      optional: true
    },
    contactName: {
      type: String,
      label: "Contact Name",
      max: 30,
      min: 1
    },
    lastSeen: {
      type: Date,
      label: "Last Seen on Chat",
      optional: true
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Chat.allow({
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
