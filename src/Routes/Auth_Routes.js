const { Router, request } = require('express')
const { check, body } = require( 'express-validator' )
const { Validar_Datos } = require( '../middlewares/Validar_datos' )
const { Existe_Email, isRFC } = require('../helpers/Validar_BD')
const router = Router()
const Auth_Controller = require( '../Controllers/Auth_Controller' )

router.post(
    '/login', 
    [
        check( 'Email', 'Email is invalid or is Empty' ).isEmail(),
        check( 'Email' ).custom( Existe_Email ),
        check( 'Password', 'Password ' ).not().isEmpty(),
        check( 'Password', 'Password don\'t have 50 caracters' ).isLength({ min: 49, max: 51}),
        Validar_Datos
    ],
    Auth_Controller.UserLogin
)

router.post(
    '/SignIn',
    [   
        check( 'Usuario', 'Usuario es invalido o esta vacio' ).not().isEmpty(),
        check( 'Email', 'El campo esta vacio' ).not().isEmpty(),
        check( 'Email', 'Correo invalido' ).isEmail(),
        check( 'Email', 'El correo ya existe' ).not().custom( Existe_Email ),
        check( 'Password', 'El campo esta vacio o no tiene 50 caracteres' ).isLength({ min: 50, max: 51 }),
        check( 'Nombre', 'El campo capo esta vacio' ).not().isEmpty(),
        check( 'ApPaterno', 'El campo capo esta vacio' ).not().isEmpty(),
        check( 'ApMaterno', 'El campo capo esta vacio' ).not().isEmpty(),
        check( 'FechaNac', 'El campo esta vacio' ).not().isEmpty(),
        check( 'FechaNac', 'El campo no es una fecha' ).isDate(),
        check( 'RFC', 'El campo no es un RFC').custom( isRFC ), 
        Validar_Datos
    ],
    Auth_Controller.singIn
)

router.post(
    '/Google_SignIn',
    [
        check('Auth', 'El token de google es necesario').not().isEmpty(),
        Validar_Datos
    ],
    Auth_Controller.google_SingIn
)

router.post(
    '/Google_LogIn',
    [
        check('Auth', 'El token de google es necesario').not().isEmpty(),
        Validar_Datos
    ],
    Auth_Controller.google_LogIn
)

module.exports = router