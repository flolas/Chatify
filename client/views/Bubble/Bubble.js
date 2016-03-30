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
              return Session.get('slider') >= Date.parse(seenAt)/1000;
            },
  'isReceived' : function (receivedAt) {
              return Session.get('slider') >= Date.parse(receivedAt)/1000;
            }
});
