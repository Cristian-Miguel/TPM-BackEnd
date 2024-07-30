const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class ServiceService {
    constructor(ServiceRepository){
        this.ServiceRepository = ServiceRepository;
    }

    async createService ({  }) {
    
    }

    async deleteServiceAsAdmin({ }) {
    
    }

    async deleteServiceAsSeller({ }) {
    
    }

    async updateService({ }){
    
    }

    async getServiceById({ }){
        
    }

    async getServiceByUuid({ }){
        
    }

    async getServicePagination({ }){
        
    }
}

module.exports = ServiceService;