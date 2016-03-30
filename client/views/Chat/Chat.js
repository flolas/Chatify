Meteor.subscribe('Chats');

function renderSlider(min, max, start, step) {
    Session.set('slider', min);
    slider = this.$("#slider").noUiSlider({
      range: {
        'min': min,
        'max': max
      },
      animate: true,
      start: start,
      step: step,
      format: wNumb({
         decimals: 3
       })
    }).on('slide', function (ev, val) {
      Session.set('slider', val);
  });
}
Tracker.autorun(function () {
  if(Session.get('sliderMin') != undefined || Session.get('sliderMax') != undefined) {
    Template.Chat.onRendered(renderSlider(Session.get('sliderMin'), Session.get('sliderMax'), Session.get('sliderMin'), 3600));
  }
});

Template['Chat'].helpers({
    slider: function () {
      return Session.get("slider");
    },
    formatDate : function(date) {
      return moment.unix(date).format('MM/DD/YYYY hh:mm a');
    },
    Bubbles : function() {
      id = Router.current().params._id;
      Bubbles = new Mongo.Collection(null);
      chats = Chats.findOne({ _id : id })
      console.log("Burbujas");
      /* TODO: Order by sentAt */
      if(Session.get('sliderMin') == undefined || Session.get('sliderMax') == undefined) {
        Session.set('sliderMin', parseInt(moment(_.first(_.pluck(chats.bubbles, 'sentAt'))).format('X')));
        Session.set('sliderMax', parseInt(moment(_.last(_.pluck(chats.bubbles, 'sentAt'))).format('X')));
      }
      for (var i = 0; i < chats.bubbles.length; i++) {
        Bubbles.insert(chats.bubbles[i]);
      }
      return Bubbles.find({
                            sentAt : {
                                      $lt : new Date(Session.get('slider')*1000)
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
    step = Math.abs(val - slider.val())/time;
    stepper = 0;
    start = parseInt(slider.val());
    timer = setInterval(function(){
              setSliderValue(start + stepper);
              if(val <= parseInt(slider.val())) {
                clearInterval(timer);
              }
              stepper+=step;
          }, 1000);
  },
  'click .stop' : function(e) {
    e.preventDefault();
    console.log("Stopped");
  }
  });

function setSliderValue(val){
  slider.val(val);
  Session.set('slider', val);
  return true;
}
