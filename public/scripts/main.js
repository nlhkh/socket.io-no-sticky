$(function() {
  var log = $('#chat-log');
  var input = $('#chat-input');

  var sender = Math.floor(Math.random() * 1000) + 1; // Random sender id
  var socket = io(window.location.host + '/chat', { transports: ['websocket'] });

  var insertMsg = function(pkg) {
    var sender = pkg.sender;
    var msg = pkg.msg;

    log.append('<li><div class="sender">' + sender + '</div><div class="msg">' + msg + '</div></li>');
  }

  socket.on('newMessage', function(data) {
    insertMsg(data);
  });

  input.keypress(function(e) {
    if (e.keyCode === 13) {
      var msg = input.val();
      var pkg = {
        sender: sender,
        msg: msg
      };
      socket.emit('newMessage', pkg);
      insertMsg(pkg);

      input.val('');
    }
  })
});
