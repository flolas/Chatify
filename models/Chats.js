Chats = new Mongo.Collection('Chats');

Schema = {};
Schema.Bubble = new SimpleSchema({
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
});

Schema.Chats = new SimpleSchema({
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
    },
    bubbles: {
    type: [Schema.Bubble]
    }
  });
  Chats.attachSchema(Schema.Chats);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Chats.allow({
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
