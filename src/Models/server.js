const express = require( 'express' )
const server_config = require( 'config' )
const cors = require( 'cors' )

class Server {

    constructor() {
        this.app = express()
        this.port = server_config.get( 'app.port' ) || process.env.PORT  
        this.middlewares ()
        this.routes()
    }

    middlewares () {

        //CORS
        this.app.use( cors() )

        //Reading and parsing from body
        this.app.use( express.json() )

        //Dir public, is for the html files
        this.app.use( express.static('public') )

    }

    routes () {
        this.app.use( '/Auth', require( '../Routes/Auth_Routes' ) )
        this.app.use( '/Usuario', require( '../Routes/Usuario_Routes' ) )
        // this.app.use( '/Hotel', require( '../Routes/Hotel_Routes' ) )
        // this.app.use( '/Viaje',  require( '../Routes/Viaje_Routes' ) )
        // this.app.use( '/Paquete',  require( '../Routes/Paquete_Routes' ) )
        // this.app.use( '/Restaurante',  require( '../Routes/Restaurante_Routes' ) )
        // this.app.use( '/Tour',  require( '../Routes/Tour_Routes' ) )
        // this.app.use( '/Reserva',  require( '../Routes/Reserva_Routes' ) )
        // this.app.use( '/Chat',  require( '../Routes/Chat_Routes' ) )
        // this.app.use( '/Favoritos',  require( '../Routes/Favoritos_Routes' ) )
        // this.app.use( '/Calificacion',  require( '../Routes/Calificacion_Routes' ) )
        // this.app.use( '/Carrusel_Imagenes',  require( '../Routes/Carrusel_Imagen_Routes' ) )
    }

    listen () {
        this.app.listen( this.port, () => {
            const datetime = new Date()
            const message = "Server enable at Port: " + this.port + " at date " + datetime
            console.log( message );
        })
    }
}

module.exports = Server