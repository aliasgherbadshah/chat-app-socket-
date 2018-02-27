var name = getQueryVariable('name') || 'Anonymus';
var room = getQueryVariable('room')
var socket = io();


console.log(name +' wants to join room '+ room);

socket.on('connect', function () {
    console.log('connected to socket io server');
})

socket.on('message', function(message){
    var time = moment.utc(message.timestamp)
          console.log('message is')
        console.log(message.text)
    jQuery('.messages').append('<strong>'+'<p>'+message.name+'<strong>'+time.local().format(' h:mm a ')+ '</strong>'+ '</strong>'+'</p>'+'<p>'+ message.text + '</p>');
      
})



$form = jQuery('#message');

$form.on('submit', function(event){
    event.preventDefault();
    var mess = $form.find('input[name=message]');
    socket.emit('message', {
        text: mess.val(),
        name: name
    })
    mess.val('')
})