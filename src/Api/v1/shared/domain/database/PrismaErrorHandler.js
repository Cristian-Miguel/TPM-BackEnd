const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, 
    PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('./PrismaError');

class PrismaErrorHandler {
    static handleError(error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const { code, meta, message, clientVersion } = error;
            throw new PrismaError(code, meta, message, clientVersion, 'PrismaClientKnownRequestError');
        } else if (error instanceof PrismaClientUnknownRequestError) {
            const { message, clientVersion } = error;
            throw new PrismaError('', '', message, clientVersion, 'PrismaClientUnknownRequestError');
        } else if (error instanceof PrismaClientRustPanicError) {
            const { message, clientVersion } = error;
            throw new PrismaError('', '', message, clientVersion, 'PrismaClientRustPanicError');
        } else if (error instanceof PrismaClientInitializationError) {
            const { errorCode, message, clientVersion } = error;
            throw new PrismaError(errorCode, '', message, clientVersion, 'PrismaClientInitializationError');
        } else if (error instanceof PrismaClientValidationError) {
            const { message, clientVersion } = error;
            throw new PrismaError('', '', message, clientVersion, 'PrismaClientValidationError');
        } else {
            throw new Error(error);
        }
    }
}

module.exports = PrismaErrorHandler;