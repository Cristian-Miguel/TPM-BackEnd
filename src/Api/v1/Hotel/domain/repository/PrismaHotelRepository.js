const HotelRepository = require( './HotelRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaHotelRepository extends HotelRepository{
    
    async createHotel ( name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        return await prisma.tbl_hotel.create({
            data:{
                name: name,
                descrition: descrition,
                main_image: main_image,
                id_category: id_category,
                id_user: id_user,
                phone_number: phone_number,
                email: email,
                website: website,
                open_hour: open_hour,
                close_hour: close_hour,
                rating: 0.00,
                date_created: new Date().toISOString(),
                last_update: new Date().toISOString()
            }
        });
    }

    async deleteHotelAdmin ( uuid ) {
        return await prisma.tbl_hotel.delete({
            where:{
                uuid_hotel: uuid
            }
        });
    }

    async deleteHotelSeller( uuid ){
        return prisma.tbl_hotel.update({
            data:{
                active: false
            },
            where: {
                uuid_hotel: uuid
            }
        })
    }

    async updateHotel ( uuid, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        return await prisma.tbl_hotel.update({
            data:{
                name: name,
                descrition: descrition,
                main_image: main_image,
                id_category: id_category,
                id_user: id_user,
                phone_number: phone_number,
                email: email,
                website: website,
                open_hour: open_hour,
                close_hour: close_hour,
                rating: 0.00,
                date_created: new Date().toISOString(),
                last_update: new Date().toISOString()
            }, 
            where:{
                uuid_hotel: uuid
            }
        });
    }

    async getHotelPagination ( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_hotel.findMany({
                skip: page,
                take: size,
                orderBy: orderBy,
                where: filter
            }),
            prisma.tbl_user.count({
                filter
            }),
          ]);

        return [ data, total ];
    }

    async getHotelByUuid ( uuid ) {
        return await prisma.tbl_hotel.findUnique({
            where:{
                uuid_hotel: uuid
            }
        });
    }

}

module.exports = PrismaHotelRepository;