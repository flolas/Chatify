now = Session.get('slider');
Template['Bubble'].helpers({
  'HHMM' : function(date) {
              return moment(date).format('HH:MM');
            },
  'isMe' : function (from) {
              return from === "me";
            },
  'isOther' : function (from) {
              return from === "other";
            },
  'isSeen' : function (seenAt) {
              return new Date(Session.get('slider')) >= seenAt;
            },
  'isReceived' : function (receivedAt) {
              return new Date(Session.get('slider')) >= receivedAt;
            }
});
