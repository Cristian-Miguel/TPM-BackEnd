
class ServiceRepository {

    async createService ( prismaSQL, service_type ) {
        throw new Error('Method not implemented.');
    }

    async deleteServiceAsAdmin( prismaSQL, id_relation_product ) {
        throw new Error('Method not implemented.');
    }

    async updateService( prismaSQL, service_type, id_relation_product ){
        throw new Error('Method not implemented.');
    }

    async getServiceByService( service_type ){
        throw new Error('Method not implemented.');
    }

    async getServiceByUuid( id_relation_product ){
        throw new Error('Method not implemented.');
    }

    async getServicePagination( skip, take, orderBy, filter ){
        throw new Error('Method not implemented.');
    }

}

module.exports = ServiceRepository;