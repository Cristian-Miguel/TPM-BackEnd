const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class ServiceService {
    constructor(ServiceRepository){
        this.ServiceRepository = ServiceRepository;
    }

    async createService ({ service_type }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.ServiceRepository.createService( prisma, service_type );
        });

        return result;
    }

    async deleteServiceAsAdmin({ id_relation_product }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.ServiceRepository.deleteServiceAsAdmin( prisma, id_relation_product );
        });

        return result;
    }

    async updateService({ service_type, id_relation_product }){
        const result = await prisma.$transaction(async (prisma) => {
            return await this.ServiceRepository.updateService( prisma, service_type, id_relation_product );
        });

        return result;
    }

    async getServiceByService({ service_type }){
        return await this.ServiceRepository.getServiceByService( service_type );
    }

    async getServiceByUuid({ id_relation_product }){
        return await this.ServiceRepository.getServiceByUuid( id_relation_product );
    }

    async getServicePagination({ page, size, orderBy, filter }){
        return await this.ServiceRepository.getServicePagination( page, size, orderBy, filter );
    }
}

module.exports = ServiceService;