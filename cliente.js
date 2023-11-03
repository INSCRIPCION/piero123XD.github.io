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

// Agrega un controlador de eventos "blur" a cada campo de entrada
var inputElements = document.querySelectorAll('input[type="text"], input[type="email"]');
inputElements.forEach(function(inputElement, index) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement, index);
    });
});

// Agrega un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement, index) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement, index);
    });
});

function enviarMensaje(inputElement, index) {
    // Verifica el tipo de campo y obtén el valor adecuado
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    mensajes[index] = valor;
    socket.send(JSON.stringify(mensajes));
}
