const { Validar_Token_Socket } = require("../middlewares/Validar_JWT")

const socketController = ( socket, io ) => {
    let Email = Validar_Token_Socket(socket.handshake.headers['authorization']);
    if ( !Email ) {
        return socket.disconnect();
    }

    // Conectarlo a una sala especial
    socket.join( Email )

    socket.on('enviar-mensaje', ({ email, mensaje }) => {
        if ( email ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje })
        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje )
            socket.emit('recibir-mensajes', chatMensajes.ultimos10 )
        }
    })

}

module.exports = {
    socketController,
}
