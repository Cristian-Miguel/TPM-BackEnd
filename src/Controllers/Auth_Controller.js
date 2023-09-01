const { response, request } = require( 'express' )//it's redundant
const { Obtener_JWT } = require('../helpers/JWT')
const { googleVerify } = require('../helpers/Google_Verify')
const QueryManager = require( '../Models/QuerryManager' )

const UserLogin = async ( req = request, res = response ) => {
    try {
        const SP_VERIFY = `CALL SP_VERIFICAR_INICIO_SESION( "${req.body.Email}", "${req.body.Password}" );`
        const isUser = await QueryManager.Listar_Informacion( SP_VERIFY )
        if( isUser[0][0].isValid == 1 ) {
            const SP_INFO = `CALL SP_OBTENER_INFO_USUARIO( "${req.body.Email}" );`
            const Info = await QueryManager.Listar_Informacion( SP_INFO )
            const token = await Obtener_JWT( req.body.Email, Info[0][0].idRol)
            return res.status(200).json({
                token: token,
                msg: 'Credenciales validas'
            })
        } else
            return res.status(401).json({
                error: 'Credenciales invalidas'
            })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            error: 'Contacta al administrador'
        })
    }
    
}

const singIn = async ( req = request, res = response ) => {
    try{ 
        const { Email } = req.body
        const informacion = req.body
        const json = JSON.parse(informacion)
        const SP = `CALL SP_CREAR_USUARIO(${json});`
        await QueryManager.Listar_Informacion( SP )
        const token = await Obtener_JWT( Email , 2 )
        return res.status(200).json({
            token: token,
            msg: 'Credenciales validas'
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Contacta al administrador' })
    }
}

const google_SingIn = async ( req = request, res = response ) => {
    try{
        const { Auth } = req.body
        const googleUser = await googleVerify(Auth.toString())
        const json = JSON.parse(googleUser);
        //verificar el correo si ya existe
        const existeCorreo = await QueryManager.Listar_Informacion( `SP_EXISTE_EMAIL("${googleUser.Email}");` )
        if( existeCorreo[0][0].inTable === 1 ) {
            return res.status(401).json({
                msg: 'Usuario ya existe'
            })
        } else {
            const SP = `CALL SP_CREAR_USUARIO_GOOGLE(${json});`
            await QueryManager.Listar_Informacion( SP )
            const token = await Obtener_JWT( googleUser.Email , 2 )
            return res.status(200).json({
                token: token,
                msg: 'Credenciales validas'
            })
        }
        
    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Contacta al administrador' })
    }
}

const google_LogIn = async ( req = request, res = response ) => {
    try{
        const { Auth } = req.body
        const googleUser = await googleVerify(Auth)
        const SP = `CALL SP_VERIFICAR_INICIO_SESION_GOOGLE(${googleUser.Email},${googleUser.google_signin});`
        const isUser = await QueryManager.Listar_Informacion( SP )
        if( isUser[0][0].isValid == 1 ){
            const SP_INFO = `CALL SP_OBTENER_INFO_USUARIO( "${req.body.Email}" );`
            const Info = await QueryManager.Listar_Informacion( SP_INFO )
            const token = await Obtener_JWT( req.body.Email, Info[0][0].idRol)
            return res.status(200).json({
                token: token,
                msg: 'Credenciales validas'
            })
        } else
            return res.status(401).json({
                error: 'Credenciales invalidas'
            })

    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Contacta al administrador' })
    }
}

module.exports = {
    UserLogin,
    singIn,
    google_SingIn,
    google_LogIn
}