var socket = io();

socket.on('connect', function () {
    console.log('connected to socket io server');
})

socket.on('message', function(message){
          console.log('message is')
        console.log(message.text)
    jQuery('.messages').append('<p>' + message.text + '</p>');
      
})



$form = jQuery('#message');

$form.on('submit', function(event){
    event.preventDefault();
    var mess = $form.find('input[name=message]');
    socket.emit('message', {
        text: mess.val()
    })
    mess.val('')
})