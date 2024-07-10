const { response, request } = require( 'express' )//it's redundant
const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );
const QueryManager = require( '../Models/QuerryManager' )

const Validate_Token = async ( req = request, res = response, next ) => {
    const token = req.header('authorization')

    if( !token ) {
        return res.status(401).json({
            msg: 'Invalida Action'
        })
    }
    try {
        const secret = server_config.get('security.JWT_SECRET')
        const { Email }  = jwt.verify( token, secret )
        const Exist = await QueryManager.Listar_Informacion( `CALL SP_EXISTE_EMAIL( "${Email}" );` )//* check if the user exist
        if( Exist[0][0].inTable == 1 ) {
            const Info = await QueryManager.Listar_Informacion( `CALL SP_OBTENER_INFO_USUARIO("${Email}" );` ) //* check if id it's the same
            if( Info[0][0].Email != Email) {
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

const Validate_Token_Socket = async ( token = '' ) => {
    try {
        const secret = server_config.get('security.JWT_SECRET')
        const { Email }  = jwt.verify( token, secret )
        const Exist = await QueryManager.Listar_Informacion( `CALL SP_EXISTE_EMAIL( "${Email}" );` )//* check if the user exist
        if( Exist[0][0].inTable == 1 ) {
            return Email;
        } else return null

    } catch (error) {
       return null
    }
}


module.exports = {
    Validate_Token,
    Validate_Token_Socket,
}