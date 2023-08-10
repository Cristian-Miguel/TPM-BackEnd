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

const isRFC = async ( RFC = '' ) => {
    if( RFC !== '' ) {
        let regex = new RegExp('[A-Z]{3,4}[0-9]{2}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[A-z0-9]{3}')
        if(regex.exec(RFC) !== null) throw new Error('RFC invalido');
    }
}

module.exports = {
    Existe_Role,
    Existe_Usuario,
    Existe_Email,
    isRFC,
}