
const SocketService = require( '../../domain/service/SocketService' );

const socketService = new SocketService();

class SocketController {

    async sendMessage ( emailSender, emailReceiver, message ) {
        try {

            const result = socketService.sendMessage( emailSender, emailReceiver, message );

            return true;
            
        } catch (error) {
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

}

module.exports = new SocketController();