const { response, request } = require( 'express' )//it's redundant
const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );
const QueryManager = require( '../Models/QuerryManager' )

const Acceso_Rol = ( ...AllRoles ) => {
    return async ( req = request, res = response, next ) => {
        try {
            const token = req.header('authorization')
            const secret = server_config.get('security.JWT_SECRET')
            const { uid, Email, idRol }  = jwt.verify( token, secret )
            const Exist = await QueryManager.Listar_Informacion( `CALL SP_EXISTE_EMAIL( "${Email}" );` )//* check if the user exist
            if( Exist[0][0].inTable == 1 ) {
                const Info = await QueryManager.Listar_Informacion( `CALL SP_OBTENER_INFO_USUARIO( "${Email}" );` ) //* check if id it's the same
                // console.log(idRol);
                if( Info[0][0].idUsuario != uid ) {
                    return res.status(401).json({
                        msg: 'Usuario denegado'
                    })
                } else {
                    const found = AllRoles.find(rols => rols == Info[0][0].idRol)
                    if( found == undefined ){
                        return res.status(401).json({
                            msg: 'Role user denied'
                        })  
                    }
                }
            } else {
                return res.status(401).json({
                    msg: 'User denied'
                })
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: 'Invalida Action'
            })
        }
    }
}

module.exports = {
    Acceso_Rol,
}