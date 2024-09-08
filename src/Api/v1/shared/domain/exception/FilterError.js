
class FilterError extends Error {

    constructor( clientResponse ) {
        super();
        this.clientResponse = clientResponse;
    }
}

module.exports = FilterError;