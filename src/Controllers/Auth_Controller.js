const { response, request } = require( 'express' )//it's redundant
const { Obtener_JWT } = require('../helpers/JWT')
const QueryManager = require( '../Models/QuerryManager' )

const UserLogin = async ( req = request, res = response ) => {
    try {
        const SP_VERIFY = `CALL SP_VERIFICAR_INICIO_SESION( "${req.body.Email}", "${req.body.Password}" );`
        const isUser = await QueryManager.Listar_Informacion( SP_VERIFY )
        if( isUser[0][0].isValid == 1 ){
        const SP_INFO = `CALL SP_OBTENER_INFO_USUARIO( "${req.body.Email}" );`
        const Info = await QueryManager.Listar_Informacion( SP_INFO )
        const token = await Obtener_JWT(Info[0][0].idUsuario, req.body.Email, Info[0][0].idRol)
            return res.status(200).json({
                token: token,
                msg: 'Valid credentials'
            })
        } else
            return res.status(401).json({
                error: 'Credencials invalid'
            })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contact the administrator'
        })
    }
    
}

module.exports = {
    UserLogin,
}