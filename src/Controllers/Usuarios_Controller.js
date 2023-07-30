const { response, request } = require( 'express' )//it's redundant
const QueryManager = require( '../Models/QuerryManager' )
const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );

const getInfoUsuario = async ( req = request, res = response ) => {
    try {
        const token = req.header('authorization')
        const secret = server_config.get('security.JWT_SECRET')
        const { Email }  = jwt.verify( token, secret )

        const sp = `CALL SP_OBTENER_INFO_USUARIO( "${Email}" );`
        const infoUsuario = await QueryManager.Listar_Informacion( sp )
        
        return res.status(200).json({
            data: infoUsuario[0][0],
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contact the administrator'
        })
    }   
}

const updateUsuario = async ( req = resquest, res = response ) => {
    try{

    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Contact the administrador' })
    }
}

const deleteUsuario = async ( req = resquest, res = response ) => {
    try{

    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Contact the administrador' })
    }
}

module.exports = {
    getInfoUsuario,
    updateUsuario,
    deleteUsuario,
}