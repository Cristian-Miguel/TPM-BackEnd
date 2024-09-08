
class PrismaError extends Error {
    constructor( code, meta, message, clientVersion, typeErrorPrisma ) {

        super();
        this.code = code;
        this.message = message;
        this.meta = meta;
        this.clientVersion = clientVersion;
        this.typeErrorPrisma = typeErrorPrisma;
        this.messageApiClient = '';
        
        if( code ) {
            this.handleCodeMessage();

        } else {
            this.handleOtherErrorPrisma();

        }

    }

    handleOtherErrorPrisma() {

        if( this.typeErrorPrisma === 'PrismaClientUnknownRequestError' ) {
            this.messageApiClient = 'Unknown database error.';
            
        } else if( this.typeErrorPrisma === 'PrismaClientRustPanicError' ) {
            this.messageApiClient = 'Fatal error with the query process. Call the administrator.';

        } else if( this.typeErrorPrisma === 'PrismaClientValidationError' ) {
            this.messageApiClient = "Error in some of your JSON fields, verify if it's the correct type on each field.";

        }

    }

    handleCodeMessage() {

        switch(this.code) {
            case 'P2000':
                this.messageApiClient = "The provided value for the column is too long for the column's type.";
                break;
            case 'P2002':
                this.messageApiClient = 'There is a unique constraint violation, a new register cannot be created.';
                break;
            case 'P2025':
                this.messageApiClient = "The field wasn't find it";
                break;
            case 'P2028':
                this.messageApiClient = "Transaction API error";
                break;
            default:
                this.messageApiClient = 'Database operation failed.';
                break;
        }

    }
}

module.exports = PrismaError;
