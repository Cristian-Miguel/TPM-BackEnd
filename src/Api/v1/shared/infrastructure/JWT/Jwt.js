const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );

const get_JWT = ( uuid_user = '', email = '', username = '', image_profile = '', id_rol = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uuid_user, email, username, image_profile, id_rol }
        jwt.sign( 
            payload,
            server_config.get('security.JWT_SECRET'), 
            { expiresIn: '72h' },
            ( error, token ) => {
                if(error){
                    console.log(error)
                    reject('Problems getting the token')
                } else resolve( token )
            }
        )
    } )
}

module.exports = {
    get_JWT,
}