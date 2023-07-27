const { Router, request } = require('express')
const { check, body } = require( 'express-validator' )
const { Validar_Datos } = require( '../middlewares/Validar_datos' )
const { Existe_Email } = require('../helpers/Validar_BD')
const router = Router()
const Auth_Controller = require( '../Controllers/Auth_Controller' )

router.post(
    '/login', 
    [
        check( 'Email', 'Email is invalid or is Empty' ).isEmail(),
        check( 'Email' ).custom( Existe_Email ),
        check('Password', 'Password ').not().isEmpty(),
        check( 'Password', 'Password less than 8 or is Empty' ).isLength({ min: 8 }),
        Validar_Datos
    ],
    Auth_Controller.UserLogin
)

module.exports = router