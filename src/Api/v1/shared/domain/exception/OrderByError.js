
class OrderByError extends Error {
    
    constructor( clientResponse ) {
        super();
        this.clientResponse = clientResponse;
    }
}

module.exports = OrderByError;