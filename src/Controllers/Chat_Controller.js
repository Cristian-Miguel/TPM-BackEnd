const { response, request } = require( 'express' )//it's redundant
const { Obtener_JWT } = require('../helpers/JWT')
const QueryManager = require( '../Models/QuerryManager' );
const { Validar_Token_Socket } = require('../middlewares/Validar_JWT');

const ListaUsuariosMensaje = async ( req = request, res = response ) => {
    try {
        const { authorization } = req.header;
        const Email = Validar_Token_Socket( authorization )
        const SP = `CALL SP_OBTIENE_LISTA_CHATS( "${ Email }" );`
        const Chats = await QueryManager.Listar_Informacion( SP )
        return res.status(200).json({
            Chats: Chats[0][0],
            msg: 'Credenciales validas'
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contacta al administrador'
        })
    }
    
}

const ListaMensajesPrivado = async ( req = request, res = response ) => {
    try {
        const { Email1, Email2 } = req.body;
        const SP = `CALL SP_OBTENER_LISTA_MENSAJES( "${ Email1 }", "${ Email2 }" );`
        const Mensajes = await QueryManager.Listar_Informacion( SP )
        return res.status(200).json({
            Mensajes: Mensajes[0][0],
            msg: 'Credenciales validas'
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contacta al administrador'
        })
    }
}

const InsertarMensaje = async ( req = request, res = response ) => {
    try {
        const SP = `CALL SP_CREAR_CHAT( "${req.body.Email1}", "${req.body.Email2}", "${req.body.Mensaje}" );`
        await QueryManager.Listar_Informacion( SP )
        return res.status(200).json({
            msg: 'Accion exitosa'
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contacta al administrador'
        })
    }
    
}

module.exports = {
    ListaUsuariosMensaje,
    ListaMensajesPrivado,
    InsertarMensaje,
}