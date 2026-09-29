import { Prisma } from '@/generated/prisma/client';

export default function errorHandler(error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2000' :
                return 'Provided value for database column is too long'
            case 'P2001' :
                return 'Database record not found'
            case 'P2002' :
                return 'Provided value or values fail one or more unique constraints'
            case 'P2003' :
                return 'Provided value or values fail one or more foreign key constraints'
            case 'P2004' :
                return 'Provided value or values fail one or more database constraints'
            case 'P2005' :
                return 'Value or values contained in database are of the wrong format for one or more database fields'
            case 'P2006' :
                return 'Provided value or values are of the wrong format for one or more database fields'
            case 'P2007' :
                return 'Provided value or values are of the wrong type or format for one or more database fields'
            case 'P2009' :
                return 'Provided value or values are of the wrong type or format for one or more database fields'
            case 'P2011' :
                return 'Provided value or values fail one or more null constraints'
            case 'P2012' :
                return 'Provided values are missing one or more required values'
            case 'P2013' :
                return 'Provided values are missing one or more required values'
            case 'P2014' :
                return 'Provided value or values fail one or more table relations'
            case 'P2015' :
                return 'Database record not found for related values'
            case 'P2016' :
                return 'Database query could not be interpreted'
            case 'P2018' :
                return 'Database record not found for connected values requested'
            case 'P2019' :
                return 'Input error'
            case 'P2020' :
                return 'Provided value or values are out of range for one or more database fields'
            case 'P2021' :
                return 'Table does not exist in the database'
            case 'P2022' :
                return 'Database record not found'
            case 'P2025' :
                return 'Operation failed because one or more required records were not found'
            case 'P2027':
                return 'Multiple errors occurred during database query exection'
            case 'P2029' :
                return 'Database query has too many parameters'
            case 'P2033' :
                return 'Id number exceeds maximum allowed. Consider changing Id field to BigInt'
            case 'P2035':
                return 'Assertion Error'
        };
    };

    return 'Error not recognized'
};