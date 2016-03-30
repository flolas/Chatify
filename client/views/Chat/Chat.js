Meteor.subscribe('Chats');
Session.set('slider', parseInt(moment(new Date("01-09-2011 00:00")).format('X')));

function renderSlider() {
    slider = this.$("#slider").noUiSlider({
      range: {
        'min': parseInt(moment(new Date("01-09-2011 00:00")).format('X')),
        'max': parseInt(moment(new Date("01-10-2011 00:00")).format('X'))
      },
      animate: true,
      start: Session.get('slider'),
      step: 3600,
      format: wNumb({
         decimals: 3
       })
    }).on('slide', function (ev, val) {
      Session.set('slider', val);
  });
}
Template.Chat.onRendered(renderSlider);

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
 /*Chats.findOne({
                _id : Router.current().params._id,
                bubbles: {
                            $filter: {
                               input: "$bubbles",
                               as: "bubbles",
                               cond: { $lte: [ "$$bubbles.sentAt", new Date("01-09-2011 01:00") ] }
                            }
                          }
              });*/

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
