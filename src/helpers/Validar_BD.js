const { Checar_Validacion } = require( '../Models/Obtener_Validacion' )

const Existe_Role = async ( Role = '' ) => {
    if( Role == '' ) throw new Error('Insert Rol')
    else if( 
        !await Checar_Validacion(
            'SP_EXISTE_ROL' ,
            `( ${Role} );`
        )
    ) throw new Error('Rol not found in the DB')
}

const Existe_Usuario = async ( Id_User = '' ) => {
    if( Id_User == '' ) throw new Error('Insert Id User')
    else if( 
        !await Checar_Validacion(
            'SP_EXISTE_USUARIO',
            `( ${Id_User} );`
        )
    ) throw new Error('Id User not found in the DB')
}

const Existe_Email = async( Email = '' ) => {
    if( Email == '' ) throw new Error('Insert Email')
    else if(
        !await Checar_Validacion(
            'SP_EXISTE_EMAIL' ,
            `( "${Email}" );`,
        )
    ) throw new Error('Email not found in the DB')
}

module.exports = {
    Existe_Role,
    Existe_Usuario,
    Existe_Email,
}