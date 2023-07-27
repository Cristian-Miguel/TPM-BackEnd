const { response, request } = require( 'express' )//it's redundant
const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );
const QueryManager = require( '../Models/QuerryManager' )

const Validar_Token = async ( req = request, res = response, next ) => {
    const token = req.header('secret')

    if( !token ) {
        return res.status(401).json({
            msg: 'Invalida Action'
        })
    }
    try {
        const secret = server_config.get('security.secretprivatekey')
        const { uid, Email }  = jwt.verify( token, secret )
        const Exist = await QueryManager.Listar_Informacion( `CALL SP_EXISTE_EMAIL( "${Email}" );` )//check if the user exist
        if( Exist[0][0].inTable == 1 ) {
            const Info = await QueryManager.Listar_Informacion( `CALL SP_GET_LOGIN_USER_INFO( "${Email}" );` ) //check if id it's the same
            if( Info[0][0].idUsuarios != uid ) {
                return res.status(401).json({
                    msg: 'User denied'
                })
            }
        } else {
            return res.status(401).json({
                msg: 'User denied'
            })
        }
        next()
    } catch ( error ) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalida Action'
        })
    }
}


module.exports = {
    Validar_Token,
}