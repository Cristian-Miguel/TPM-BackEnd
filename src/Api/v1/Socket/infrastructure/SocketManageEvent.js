const ValidateJwt = require( '../../Validation/infrastructure/ValidateJwt' );
const SocketController = require( '../application/controller/SocketController' )

class SocketManage {

    constructor( socket, io ){
        this.socket = socket;
        this.io = io;

        let { email, uuid_user } = ValidateJwt.validteTokenSocket(socket.handshake.headers['authorization']);

        if ( email && uuid_user) {
            this.email = email;
            this.uuid_user = uuid_user;

            // Connect to a special room
            socket.join( this.email );
            
            this.sendMessage();
        } else {
            return socket.disconnect();
        }
    }

    sendMessage () {
        this.socket.on('send_message', ({ email, message }) => {
            if ( email ) {

                const saveSuccess = SocketController.sendMessage( this.email, email, message )

                // private message
                socket.to( email ).emit( 'private_message', { de: this.email, message });
            } else {
                // chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje )
                // socket.emit('get_message', chatMensajes.ultimos10 );
            }
        })
    }

}

module.exports = SocketManage;