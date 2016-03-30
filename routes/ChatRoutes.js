Router.route('/chat/:_id/view', function () {
  this.render('Chat', {
    data: function () { return Chats.findOne({_id: this.params._id}) }
  });
});
