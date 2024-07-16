const { OAuth2Client } = require( 'google-auth-library' );
const serverConfig = require( 'config' )

const client = new OAuth2Client( serverConfig.get( 'google.CLIENT_ID' ) );

async function googleVerify( token = '' ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: serverConfig.get( 'google.CLIENT_ID' ),  
  });
  const { given_name, family_name, email, picture  } = ticket.getPayload();
  return {
    Nombre: given_name, 
    Apellidos: family_name,
    Email: email,
    Imagen: picture,
    Password: 1,
    idRol: 2,
    google_signin: 1,
  }
}

module.exports = {
    googleVerify
}