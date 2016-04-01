Meteor.subscribe('Chats');

function renderSlider(min, max, start, step) {
    Session.set('slider', (min).toStringDate());
    slider = this.$("#slider").noUiSlider({
      range: {
        'min': min,
        'max': max
      },
      animate: true,
      start: start,
      step: step,
      format: {
      to: function ( value ) {
        return (value).toStringDate();
      },
      from: function ( value ) {
        return value;
      }
    }
    }).on('slide', function (ev, val) {
      Session.set('slider', val);
  });
}
Tracker.autorun(function () {
  if(Session.get('sliderMin') != undefined || Session.get('sliderMax') != undefined) {
    console.log("Slider rendered");
    Template.Chat.onRendered(renderSlider(Session.get('sliderMin'), Session.get('sliderMax'), Session.get('sliderMin'), 3600));
  }
});

Template['Chat'].helpers({
    slider: function () {
      return Session.get("slider");
    },
    Bubbles : function() {
      if (typeof(Bubbles) === "undefined"){
        id = Router.current().params._id;
        Bubbles = new Mongo.Collection(null);
        chats = Chats.findOne({ _id : id })
        // Sort Bubbles by sentAt
        chats.bubbles = _.sortBy(chats.bubbles, 'sentAt');
        console.log("Bubble collection created");
        if(Session.get('sliderMin') == undefined || Session.get('sliderMax') == undefined) {
          // Getting all dates and merge to one array
          pluckedSentAt = _.pluck(chats.bubbles, 'sentAt');
          pluckedReceivedAt = _.pluck(chats.bubbles, 'receivedAt');
          pluckedSeenAt = _.pluck(chats.bubbles, 'seenAt');
          pluckedDates = _.union(pluckedSentAt, pluckedReceivedAt, pluckedSeenAt).sort().filter( Boolean );
          console.log("Setting slider range");
          Session.set('sliderMin', parseInt(moment(_.first(pluckedDates)).format('X')));
          Session.set('sliderMax', parseInt(moment(_.last(pluckedDates)).format('X')));
        }
        for (var i = 0; i < chats.bubbles.length; i++) {
          Bubbles.insert(chats.bubbles[i]);
        }
      }
      return Bubbles.find({
                            sentAt : {
                                      $lte : new Date(Session.get('slider'))
                                     }
                          });
    }
});

Template['Chat'].events({
  'click .play' : function(e) {
    console.log("Playing...");
    e.preventDefault();
    time = 20; //seconds
    val = parseInt(moment(new Date("01-10-2011 00:00")).format('X'));
    step = Math.abs(val - slider.val().toUnix())/time;
    stepper = 0;
    start = slider.val().toUnix();
    timer = setInterval(function(){
              Session.set('timerId', timer);
              if(Session.get('sliderMax') == Math.round(slider.val().toUnix())) {
                console.log("Played");
                clearInterval(timer);
                return true;
              }
              setSliderValue(start + stepper);
              stepper+=step;
          }, 1000);
  },
  'click .pause' : function(e) {
    e.preventDefault();
    clearInterval(Session.get('timerId'));
    console.log("Pause");
  },
  'click .stop' : function(e) {
    e.preventDefault();
    clearInterval(Session.get('timerId'));
    setSliderValue(Session.get('sliderMin'));
    console.log("Stopped");
  }
  });

function setSliderValue(val){
  slider.val(val);
  Session.set('slider', (val).toStringDate());
  return true;
}

Date.prototype.toUnix = function() { return parseInt(moment(this, 'MM/DD/YYYY hh:mm a').format('X')); };
String.prototype.toUnix = function() { return parseInt(moment(this, 'MM/DD/YYYY hh:mm a').format('X')); };
Number.prototype.toStringDate = function() { return moment.unix(Math.round(this)).format('MM/DD/YYYY hh:mm a'); };
