const { PrismaClientKnownRequestError } = require('@prisma/client');

class PrismaError extends PrismaClientKnownRequestError {
    constructor( code ){
        super();
        this.code = code;
        this.errorWinston = super.message;
        this.field = super.meta;
        this.version = super.clientVersion;
        this.messageError = '';
        
        this.handleCodeMessage();
    }

    handleCodeMessage(){
        switch(this.code){
            case 'P2000':
                this.messageError = "The provided value for the column is too long for the column's type.";
                break;
            case 'P2002':
                this.messageError = 'There is a unique constraint violation, a new register cannot be created.';
                break;
            case 'P2025':
                this.messageError = "The field wasn't find it";
                break;
            case 'P2025':
                break;
            default:
                this.messageError = 'Database operation failed.';
                break;
        }
    }
}

module.exports = PrismaError;
