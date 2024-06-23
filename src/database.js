const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    prisma
}

// const mysql         = require('mysql');
// const server_config = require('config');

// module.exports = () => {
//   let config = {
//     host     : server_config.get('db.host'),
//     port     : server_config.get('db.port'),
//     user     : server_config.get('db.user'),
//     password : server_config.get('db.password'),
//     database : server_config.get('db.database'),
//   }
//   return new Database(config)
// }

// class Database {
//   constructor() {
//       this.connection = mysql.createConnection( config )
//   }

//   query( sql, args ) {
//       return new Promise( ( resolve, reject ) => {
//           this.connection.query( sql, args, ( err, rows ) => {
//               if ( err )
//                   return reject( err )
//               resolve( rows )
//           } )
//       } )
//   }

//   close() {
//       return new Promise( ( resolve, reject ) => {
//           this.connection.end( err => {
//               if ( err )
//                   return reject( err )
//               resolve()
//           } )
//       } )
//   }
// }
