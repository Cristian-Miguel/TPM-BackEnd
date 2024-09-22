const FilterError = require( '../exception/FilterError' );
const OrderByError = require( '../exception/OrderByError' );

/**
 * * Handle to build the filter or order in prisma format.
 *  Provides methods to build the filter and order in prisma format. 
 * @class FilterOrOrderDataHandle
 */
class FilterOrOrderAdapter {

    /**
     * Function to transform filter array to prisma format.
     * 
     * @param {object} validFields - Fields allowed to filter.
     * @param {array} filter - filter format to get by api.
     * @returns {object} - The filter object build in prisma format.
     * @throws Will throw a filterError if filter build fails.
     */
    static buildFilter(validFields, filter) {
        const chooseFilterTypeFormat = (field, filterType, compare, isNested) => {
            const baseObj = isNested 
                ? { [Object.keys(field)[0]]: { [Object.values(field)[0]]: {[filterType]: compare} } }
                : { [field]: {[filterType]: compare} };
        
            return baseObj;
        };

        const prismaFilter = filter.reduce((acc, { field, filter_type, compare }) => {
            if (validFields[field]) {
                const prismaField = validFields[field];
                const isNested = typeof prismaField !== 'string';
        
                switch (filter_type) {
                    case 'like':
                        if (typeof compare === 'number') {
                            throw new FilterError(`Filter type "${filter_type}" is invalid for field "${field}"`);
                        }
                        acc.push(chooseFilterTypeFormat(prismaField, 'contains', compare, isNested));
                        break;
        
                    case 'eq':
                        acc.push(chooseFilterTypeFormat(prismaField, 'equals', compare, isNested));
                        break;
        
                    case 'gt':
                        acc.push(chooseFilterTypeFormat(prismaField, 'gt', compare, isNested));
                        break;
        
                    case 'lt':
                        acc.push(chooseFilterTypeFormat(prismaField, 'lt', compare, isNested));
                        break;
        
                    default:
                        throw new FilterError(`Filter type "${filter_type}" is invalid for field "${field}"`);
                }
            } else {
                throw new FilterError(`Field "${field}" is not implemented or doesn't exist`);
            }
            return acc;
        }, []);

        const filterAdapter = {
            AND: prismaFilter
        }
        
        return filterAdapter;
    }

    /**
     * Function to transform orderBy array to prisma format.
     * 
     * @param {object} validFields - Fields allowed to filter
     * @param {array} orderBy - orderBy format to get by api
     * @returns {object} - The orderBy object build in prisma format.
     * @throws Will throw a orderByError if orderBy build fails.
     */
    static buildOrderBy(validFields, orderBy) {
        const prismaOrderBy = orderBy.reduce((acc, { field, order_type }) => {
            const prismaField = validFields[field];

            if (prismaField) {
                if (typeof prismaField === 'string') {
                    // Simple field case
                    acc.push({ [prismaField]: order_type });
                } else {
                    // Relation field case
                    acc.push({
                        [Object.keys(prismaField)[0]]: {
                            [Object.values(prismaField)[0]]: order_type
                        }
                    });
                }
            } else {
                throw new OrderByError(`Field "${field}" is not implemented or doesn't exist`);
            }

            return acc;
        }, []);

        return prismaOrderBy;
    }

}

module.exports = FilterOrOrderAdapter;