const { response, request } = require( 'express' )//it's redundant
const { get_JWT } = require('../helpers/JWT')
const { googleVerify } = require('../helpers/Google_Verify')
const { prisma } = require('../database')
const Response_Code_Message = require('../helpers/constant/Response_Code_Message.js');
const winston = require('winston');
require('../helpers/Logger.js');

const sign_in = async ( req = request, res = response ) => {
    try {

        const user = await prisma.tbl_user.findUnique({
            select:{
                uuid_user: true,
                email: true,
                username: true,
                image_profile: true,
                id_rol: true
            },
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        if(user !== null && user !== undefined) {

            const user_update = await prisma.tbl_user.update({
                where: {
                    uuid_user: user.uuid_user
                },
                data: {
                    last_logger:  new Date().toISOString()
                }
            }); 

            const token = await get_JWT( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );

            return res.status(200).json({
                success: true,
                token: token,
                msg: Response_Code_Message.CODE_200
            })

        } else {

            const auth_logger = winston.loggers.get('AuthLogger');
            auth_logger.info('User unauthenticate');

            return res.status(401).json({
                success: false,
                error: Response_Code_Message.CODE_401
            })
        }

    } catch (error) {

        // console.log(error)
        const auth_logger = winston.loggers.get('AuthLogger');
        auth_logger.error(`Error in the sign in: ${error}`);

        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500()
        })

    }
}

const sign_up = async ( req = request, res = response ) => {
    try{
        const body = req.body;

        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.tbl_user.create({
                data: {
                    email:          body.email,
                    username:       body.username,
                    image_profile:  body.image_profile === null ? 'default' : body.image_profile,
                    password:       body.password,
                    first_name:     body.first_name,
                    last_name:      body.last_name,
                    birth_day:      body.birth_day,
                    token:          "",
                    refresh_token:  "",
                    last_logger:    new Date().toISOString(),
                    user_create:    new Date().toISOString(),
                    google_sign:    false,
                    last_update:    new Date().toISOString(),
                    id_rol:         1
                }
            });
    
            const token = await get_JWT( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );
    
            const address = await prisma.tbl_address_user.create({
                data: {
                    id_user:        user.id_user,
                    street:         body.street,
                    city:           body.city,
                    state:          body.state,
                    country:        body.country,
                    postal_code:    body.zip_code,
                    date_created:    new Date().toISOString()
                }
            });
    
            const userUpdate = await prisma.tbl_user.update({
                where: {
                    uuid_user: user.uuid_user
                },
                data: {
                    token:  token,
                    refresh_token: token
                }
            });

            return userUpdate;
        });

        const token = result.token;

        return res.status(201).json({
            success: true,
            token: token,
            msg: Response_Code_Message.CODE_201
        })
    } catch(error) {

        const auth_logger = winston.loggers.get('AuthLogger');
        auth_logger.error(`Error in the sign up: ${error}`);
        
        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500()
        })
    }
}

const google_sign_up = async ( req = request, res = response ) => {
    try{
        const { Auth } = req.body
        const googleUser = await googleVerify(Auth.toString())
        const json = JSON.parse(googleUser);
        //verificar el correo si ya existe
        // const existeCorreo = await QueryManager.Listar_Informacion( `SP_EXISTE_EMAIL("${googleUser.Email}");` )
        if( existeCorreo[0][0].inTable === 1 ) {
            return res.status(401).json({
                msg: 'Usuario ya existe'
            })
        } else {
            const SP = `CALL SP_CREAR_USUARIO_GOOGLE(${json});`
            // await QueryManager.Listar_Informacion( SP )
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

const google_sign_in = async ( req = request, res = response ) => {
    try{
        const { Auth } = req.body
        const googleUser = await googleVerify(Auth)
        const SP = `CALL SP_VERIFICAR_INICIO_SESION_GOOGLE(${googleUser.Email},${googleUser.google_signin});`
        // const isUser = await QueryManager.Listar_Informacion( SP )
        if( isUser[0][0].isValid == 1 ){
            const SP_INFO = `CALL SP_OBTENER_INFO_USUARIO( "${req.body.Email}" );`
            // const Info = await QueryManager.Listar_Informacion( SP_INFO )
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
    sign_in,
    sign_up,
    google_sign_in,
    google_sign_up
}