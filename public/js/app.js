var socket = io();

socket.on('connect', function () {
    console.log('connected to socket io server');
})

socket.on('message', function(message){
    var time = moment.utc(message.timestamp)
          console.log('message is')
        console.log(message.text)
    jQuery('.messages').append('<p>'+'<strong>'+time.local().format('h:mm a ')+ '</strong>'+ message.text + '</p>');
      
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