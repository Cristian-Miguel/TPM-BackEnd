const { Router } = require( 'express' )
const { check } = require( 'express-validator' )
const { Validar_Token } = require('../middlewares/Validar_JWT')
const { ListaUsuariosMensaje, ListaMensajesPrivado, InsertarMensaje } = require('../controllers/Chat_Controller')
const { Validar_Datos } = require( '../middlewares/Data_Validate' )
const { Existe_Email } = require('../helpers/Custom_Json_Validation')
const router = Router()

//--------- Routes ---------\\
router.get( '/usuarios-mensaje', [
    Validar_Token,
    Validar_Datos
], ListaUsuariosMensaje )


router.post( '/lista-mensaje-privado-usuario', [
    Validar_Token,
    check( 'Email1', 'Correo es requerido' ).not().isEmpty(),
    check( 'Email1', 'No es un correo' ).isEmail(),
    check( 'Email1', 'Correo no valido' ).custom( Existe_Email ),
    check( 'Email2', 'Correo es requerido' ).not().isEmpty(),
    check( 'Email2', 'No es un correo' ).isEmail(),
    check( 'Email2', 'Correo no valido' ).custom( Existe_Email ),
    Validar_Datos
], ListaMensajesPrivado )

router.post('/insertar',[
    Validar_Token,
    check( 'Email1', 'Correo es requerido' ).not().isEmpty(),
    check( 'Email1', 'No es un correo' ).isEmail(),
    check( 'Email1', 'Correo no valido' ).custom( Existe_Email ),
    check( 'Email2', 'Correo es requerido' ).not().isEmpty(),
    check( 'Email2', 'No es un correo' ).isEmail(),
    check( 'Email2', 'Correo no valido' ).custom( Existe_Email ),
    check( 'Mensaje', 'Mensaje es requerido' ).not().isEmpty(),
    Validar_Datos
],InsertarMensaje)

// route.post('/delete', [])

module.exports = router