var socket = new WebSocket("ws://localhost:8770");
var mensajes = [];

socket.onopen = function(event) {
    console.log("Conexión WebSocket abierta");
};

socket.onmessage = function(event) {
    console.log("Mensaje recibido del servidor: " + event.data);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log("Conexión WebSocket cerrada de manera limpia, código=" + event.code);
    } else {
        console.error("Conexión WebSocket cerrada de manera inesperada");
    }
};

socket.onerror = function(error) {
    console.error("Error en la conexión WebSocket: " + error.message);
};

// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement, index) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement, index);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement, index) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement, index);
    });
});

// Modificar la función enviarMensaje para recorrer todos los elementos
function enviarMensaje() {
    var inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="radio"]');
    mensajes = Array.from(inputElements).map(function(inputElement) {
        return inputElement.value;
    });

    socket.send(JSON.stringify(mensajes));
}

// Agregar un controlador de eventos "blur" a todos los elementos
var allInputElements = document.querySelectorAll('input[type="text"], input[type="email"]);
allInputElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', enviarMensaje);

});
