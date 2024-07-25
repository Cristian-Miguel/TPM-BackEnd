const cors = require( 'cors' );
const express = require( 'express' );
const helmet = require( 'helmet' );
const morgan = require('morgan');
const server_config = require( 'config' );
const dotenv = require('dotenv');
const SocketManageEvent = require( '../../../Socket/infrastructure/SocketManageEvent' );

class Server {

    constructor() {
        this.app = express();
        this.port = server_config.get( 'app.port' );
        this.server = require( 'http' ).createServer( this.app );
        this.io = require( 'socket.io' )( this.server );

        this.mainRoute = '/api/v1';

        this.routesSrc = this.routesSrc();

        this.middlewares();
        this.routes();
        this.socket();
    }

    middlewares () {

        //CORS
        this.app.use( cors() );

        //Helmet
        this.app.use( helmet() );

        //Morgan
        this.app.use( morgan('combined') );

        //Reading and parsing from body
        this.app.use( express.json() );

        //Dir public, is for the html files
        this.app.use( express.static('public') );

    }

    routesSrc () {

        return {
            basicAuth:          this.mainRoute + '/auth',
            googleAuth:         this.mainRoute + '/auth_google',
            facebookAuth:       this.mainRoute + '/auth_facebook',
            user:               this.mainRoute + '/user',
            hotel:              this.mainRoute + '/hotel',
            roomHotel:          this.mainRoute + '/hotel/room',
            roomCategoryHotel:  this.mainRoute + '/hotel/room/category',
            addressService:     this.mainRoute + '/address_service',
        };

    }

    routes () {
        this.app.use( this.routesSrc.basicAuth,             require( '../../../Auth/infrastructure/routes/BasicAuthRoute' ) );
        this.app.use( this.routesSrc.user,                  require( '../../../User/infrastructure/routes/UserRoutes' ) );
        this.app.use( this.routesSrc.hotel,                 require( '../../../Hotel/infrastructure/routes/HotelRoutes' ) );
        this.app.use( this.routesSrc.roomHotel,             require( '../../../Hotel/infrastructure/routes/HotelRoomRoutes' ) );
        this.app.use( this.routesSrc.roomCategoryHotel,     require( '../../../Hotel/infrastructure/routes/RoomCategoryRoutes' ) );
        this.app.use( this.routesSrc.addressService,        require( '../../../Address/infraestructure/routes/AddressServiceRoutes' ) );
    }
    
    socket () {
        this.io.on('connection', ( socket ) => new SocketManageEvent(socket, this.io) );
    }

    listen () {
        this.server.listen( this.port, () => {
            const datetime = new Date();
            const message = "Server enable at Port: " + this.port + " at date " + datetime
            console.log( message );
        })
    }
}

module.exports = Server