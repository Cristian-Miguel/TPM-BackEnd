const QueryManager = require( '../Models/QuerryManager' )

async function Checar_Validacion ( Name_SP, data ) {
    const SP = `CALL ${Name_SP} ${data} `
    const inTable = await QueryManager.Listar_Informacion( SP )
    if( inTable[0][0].inTable == 1 )  return true
    else return false
}

module.exports = {
    Checar_Validacion
}